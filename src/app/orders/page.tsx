"use client"

import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import CheckBox from "@/components/UI/CheckBox";
import Modal from "@/components/UI/Modal";
import styles from "./page.module.scss";
import useFetch from "@/components/hooks/useFetch";
import { GetOrdersResponse, Order, OrderCounts, OrderPagination, OrderFilterParams } from "@/components/types/fetch";
import { useRouter } from "next/navigation";

export default function Index() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersCounts, setOrdersCounts] = useState<OrderCounts>({
    totalOrders: 0,
    totalSuccededOrders: 0,
    totalFailedOrders: 0,
    totalRefundedOrders: 0,
  });
  const [totalMatchedOrders, setTotalMatchedOrders] = useState<number>(0);
  const [paginationInfo, setPaginationInfo] = useState<OrderPagination | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [fetchParams, setFetchParams] = useState<OrderFilterParams>({
    filter: {},
    sort: { sortBy: 'createdAt', sortOrder: 'desc' },
    page: 1,
    limit: 12,
    status: null
  });

  const router = useRouter();

  const { data, fetchData, loading, error } = useFetch({
    url: "order/getOrders",
    method: "POST",
    body: fetchParams
  });
  
  useEffect(() => {
    fetchData();
    setSelectedOrders([]);
  }, [fetchParams]);

  useEffect(() => {
    if (data) {
      const ordersResponse = data as unknown as GetOrdersResponse;
      setOrders(ordersResponse?.data || []);
      setOrdersCounts(ordersResponse?.counts || {
        totalOrders: 0,
        totalSuccededOrders: 0,
        totalFailedOrders: 0,
        totalRefundedOrders: 0,
      });
      setTotalMatchedOrders(
        ordersResponse?.totalMatchedOrders ?? ordersResponse?.data?.length ?? 0
      );
      setPaginationInfo(ordersResponse?.pagination ?? null);
    }
  }, [data]);

  const handleOrderSelection = (orderId: number) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      // Tout désélectionner
      setSelectedOrders([]);
    } else {
      // Tout sélectionner
      setSelectedOrders(orders.map(order => order.id));
    }
  };

  const handleDeleteClick = () => {
    if (selectedOrders.length === 0) return;
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/deleteOrders`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderIds: selectedOrders.map(id => id.toString()) })
      });
      const result = await response.json();

      if (result.success) {
        setSelectedOrders([]);
        fetchData();
      } else {
        alert(`Erreur: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression des commandes');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getOrderStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'processing': 'En cours',
      'shipped': 'Expédié',
      'delivered': 'Livré',
      'cancelled': 'Annulé'
    };
    return statusMap[status] || status;
  };

  const getPaymentStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'En attente',
      'succeded': 'Réussi',
      'failed': 'Échoué',
      'refunded': 'Remboursé'
    };
    return statusMap[status] || status;
  };

  const toggleSort = (
    field: 'orderId' | 'customer' | 'date' | 'total' | 'orderStatus' | 'paymentStatus' | 'address'
  ) => {
    setFetchParams(prev => {
      const previousSort = prev.sort || { sortBy: 'createdAt', sortOrder: 'desc' };
      const isSameField = previousSort.sortBy === field;
      const nextOrder = isSameField
        ? (previousSort.sortOrder === 'asc' ? 'desc' : 'asc')
        : 'asc';
      return {
        ...prev,
        sort: { sortBy: field, sortOrder: nextOrder }
      };
    });
  };
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}><img src="/icons/box.svg" alt="orders"/>Commandes</h1>

      <div className={styles.ordersStats}>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, paymentStatus: null }, status: null }))}>
          <p className={styles.label}>Commandes</p>
          <p className={styles.value}>{ordersCounts.totalOrders}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, paymentStatus: 'succeded' }, status: 'succeded' }))}>
          <p className={styles.label}>Réussi</p>
          <p className={styles.value}>{ordersCounts.totalSuccededOrders}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, paymentStatus: 'failed' }, status: 'failed' }))}>
          <p className={styles.label}>Échouées</p>
          <p className={styles.value}>{ordersCounts.totalFailedOrders}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, paymentStatus: 'refunded' }, status: 'refunded' }))}>
          <p className={styles.label}>Remboursées</p>
          <p className={styles.value}>{ordersCounts.totalRefundedOrders}</p>
        </div>
      </div>

      <div className={styles.ordersActions}>
        {/* <Button title="Importer" type="button" handleClick={() => {}} style="grey" />
        <Button title="Exporter" type="button" handleClick={() => {}} style="grey" /> */}
        <Button 
          title={`Supprimer${selectedOrders.length > 0 ? ` (${selectedOrders.length})` : ''}`} 
          type="button" 
          handleClick={handleDeleteClick} 
          style={selectedOrders.length > 0 ? "red" : "unavailable"} 
        />
        {/* <Button title="Créer un lien de paiement" type="button" handleClick={() => { router.push('/orders/payment-link') }} style="black" /> */}
        {/* <Button title="Ajouter une commande" type="button" handleClick={() => { router.push('/orders/add') }} style="black" /> */}
      </div>

      <div className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
          <CheckBox
            name="selectAll"
            id="selectAll"
            checked={selectedOrders.length === orders.length && orders.length > 0}
            onChange={handleSelectAll}
          />
          <p onClick={() => toggleSort('orderId')}>
            <span>Commande</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'orderId' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('customer')}>
            <span>Client</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'customer' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('date')}>
            <span>Date</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'date' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('total')}>
            <span>Montant</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'total' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('orderStatus')}>
            <span>Status de commande</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'orderStatus' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('paymentStatus')}>
            <span>Statut du paiement</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'paymentStatus' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('address')}>
            <span>Adresse</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'address' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
        </div>

        
        <div className={styles.ordersList}>
          {orders.map((order) => {
            const isSelected = selectedOrders.includes(order.id);
            return (
              <div key={order.id} className={styles.orderItem} onClick={() => router.push(`/orders/${order.id}`)}>
                <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <CheckBox
                    name={`select-${order.id}`}
                    id={`select-${order.id}`}
                    checked={isSelected}
                    onChange={() => handleOrderSelection(order.id)}
                  />
                </div>
                <p>#{order.id}</p>
                <p>{order.customerFirstName} {order.customerLastName}</p>
                <p>{formatDate(order.createdAt)}</p>
                <p>{formatPrice(order.total)}</p>
                <p>{getOrderStatusLabel(order.orderStatus)}</p>
                <p>{getPaymentStatusLabel(order.paymentStatus)}</p>
                <p>{order.address.city} {order.address.postalCode}, {order.address.country}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.ordersFooter}>
          <div>
            <p>{totalMatchedOrders} {totalMatchedOrders > 1 ? 'Résultats' : 'Résultat'}</p>
          </div>
          <div className={styles.ordersFooterPages}>
            <Button
              title="Previous"
              type="button"
              handleClick={() => {if (!paginationInfo?.hasPrevPage) return; setFetchParams(prev => ({ ...prev, page: Math.max((prev.page || 1) - 1, 1) }));}}
              style={!paginationInfo?.hasPrevPage ? "unavailable" : ""}
            />

            <Button
              title="Next"
              type="button"
              handleClick={() => {if (!paginationInfo?.hasNextPage) return; setFetchParams(prev => ({ ...prev, page: (prev.page || 1) + 1 }));}}
              style={!paginationInfo?.hasNextPage ? "unavailable" : ""}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer ${selectedOrders.length} commande(s) ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}
