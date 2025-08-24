"use client"

import { useEffect, useState } from "react";
import Button from "@/components/UI/Button";
import CheckBox from "@/components/UI/CheckBox";
import Modal from "@/components/UI/Modal";
import styles from "./page.module.scss";
import useFetch from "@/components/hooks/useFetch";
import { GetUsersResponse, User, UserCounts, UserPagination, UserFilterParams } from "@/components/types/fetch";
import { useRouter } from "next/navigation";

export default function Index() {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [customers, setCustomers] = useState<User[]>([]);
  const [customersCounts, setCustomersCounts] = useState<UserCounts>({
    totalUsers: 0,
    totalActiveUsers: 0,
    totalUsersWithOrders: 0,
    totalUsersWithoutOrders: 0,
    totalSpent: 0,
  });
  const [totalMatchedCustomers, setTotalMatchedCustomers] = useState<number>(0);
  const [paginationInfo, setPaginationInfo] = useState<UserPagination | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [fetchParams, setFetchParams] = useState<UserFilterParams>({
    filter: {},
    sort: { sortBy: 'createdAt', sortOrder: 'desc' },
    page: 1,
    limit: 12,
    status: null
  });

  const router = useRouter();

  const { data, fetchData, loading, error } = useFetch({
    url: "user/getUsers",
    method: "POST",
    body: fetchParams
  });
  
  useEffect(() => {
    fetchData();
    setSelectedCustomers([]);
  }, [fetchParams]);

  useEffect(() => {
    if (data) {
      const usersResponse = data as unknown as GetUsersResponse;
      setCustomers(usersResponse?.data || []);
      setCustomersCounts(usersResponse?.counts || {
        totalUsers: 0,
        totalActiveUsers: 0,
        totalUsersWithOrders: 0,
        totalUsersWithoutOrders: 0,
        totalSpent: 0,
      });
      setTotalMatchedCustomers(
        usersResponse?.totalMatchedUsers ?? usersResponse?.data?.length ?? 0
      );
      setPaginationInfo(usersResponse?.pagination ?? null);
    }
  }, [data]);

  const handleCustomerSelection = (customerId: number) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      // Tout désélectionner
      setSelectedCustomers([]);
    } else {
      // Tout sélectionner
      setSelectedCustomers(customers.map(customer => customer.id));
    }
  };

  const handleDeleteClick = () => {
    if (selectedCustomers.length === 0) return;
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/deleteUsers`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds: selectedCustomers.map(id => id.toString()) })
      });
      const result = await response.json();

      if (result.success) {
        setSelectedCustomers([]);
        fetchData();
      } else {
        alert(`Erreur: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression des clients');
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

  const toggleSort = (
    field: 'id' | 'name' | 'email' | 'totalSpent' | 'totalOrders' | 'createdAt' | 'lastOrder'
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
      <h1 className={styles.title}><img src="/icons/user.svg" alt="customers"/>Clients</h1>

      <div className={styles.customersStats}>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, hasOrders: null }, status: null }))}>
          <p className={styles.label}>Clients</p>
          <p className={styles.value}>{customersCounts.totalUsers}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, hasOrders: true }, status: 'with_orders' }))}>
          <p className={styles.label}>Ont commandé</p>
          <p className={styles.value}>{customersCounts.totalUsersWithOrders}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, filter: { ...prev.filter, hasOrders: false }, status: 'without_orders' }))}>
          <p className={styles.label}>N&apos;ont pas commandé</p>
          <p className={styles.value}>{customersCounts.totalUsersWithoutOrders}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Total des dépenses</p>
          <p className={styles.value}>{formatPrice(customersCounts.totalSpent)}</p>
        </div>
      </div>

      <div className={styles.customersActions}>
        <Button 
          title={`Supprimer${selectedCustomers.length > 0 ? ` (${selectedCustomers.length})` : ''}`} 
          type="button" 
          handleClick={handleDeleteClick} 
          style={selectedCustomers.length > 0 ? "red" : "unavailable"} 
        />
      </div>

      <div className={styles.customersContainer}>
        <div className={styles.customersHeader}>
          <CheckBox
            name="selectAll"
            id="selectAll"
            checked={selectedCustomers.length === customers.length && customers.length > 0}
            onChange={handleSelectAll}
          />
          <p onClick={() => toggleSort('name')}>
            <span>Client</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'name' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('email')}>
            <span>Email</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'email' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('totalSpent')}>
            <span>Total dépensé</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'totalSpent' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('totalOrders')}>
            <span>Nombre de commandes</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'totalOrders' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('createdAt')}>
            <span>Date de création</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'createdAt' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
        </div>

        <div className={styles.customersList}>
          {customers.map((customer) => {
            const isSelected = selectedCustomers.includes(customer.id);
            return (
              <div key={customer.id} className={styles.customerItem} onClick={() => router.push(`/customers/${customer.id}`)}>
                <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <CheckBox
                    name={`select-${customer.id}`}
                    id={`select-${customer.id}`}
                    checked={isSelected}
                    onChange={() => handleCustomerSelection(customer.id)}
                  />
                </div>
                <p>{customer.firstName} {customer.lastName}</p>
                <p>{customer.email}</p>
                <p>{formatPrice(customer.orderSummary.totalSpent)}</p>
                <p>{customer.orderSummary.totalOrders} {customer.orderSummary.totalOrders > 1 ? "commandes" : "commande"}</p>
                <p>{formatDate(customer.createdAt)}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.customersFooter}>
          <div>
            <p>{totalMatchedCustomers} {totalMatchedCustomers > 1 ? 'Résultats' : 'Résultat'}</p>
          </div>
          <div className={styles.customersFooterPages}>
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
        message={`Êtes-vous sûr de vouloir supprimer ${selectedCustomers.length} client(s) ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}