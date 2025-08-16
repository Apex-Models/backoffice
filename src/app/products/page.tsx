"use client"

import { useEffect, useState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import CheckBox from "@/components/UI/CheckBox";
import Modal from "@/components/UI/Modal";
import styles from "./page.module.scss";
import useFetch from "@/components/hooks/useFetch";
import { GetProductsResponse, Product, ProductCounts, ProductPagination } from "@/components/types/fetch";
import { useRouter } from "next/navigation";

interface ProductFilterParams {
  filter?: {
    minPrice?: number | string;
    maxPrice?: number | string;
    type?: string;
    category?: string[];
    status?: 'active' | 'inactive' | null;
  };
  sort?: {
    sortBy?: 'name' | 'price' | 'status' | 'type' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
  };
  page?: number;
  limit?: number | null;
  status?: 'active' | 'inactive' | null;
}

export default function Index() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCounts, setProductsCounts] = useState<ProductCounts>({
    totalProducts: 0,
    totalActiveProducts: 0,
    totalInactiveProducts: 0,
  });
  const [totalMatchedProducts, setTotalMatchedProducts] = useState<number>(0);
  const [paginationInfo, setPaginationInfo] = useState<ProductPagination | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [fetchParams, setFetchParams] = useState<ProductFilterParams>({
    filter: {},
    sort: { sortBy: 'createdAt', sortOrder: 'desc' },
    page: 1,
    limit: 12,
    status: null
  });

  const router = useRouter();

  const { data, fetchData, loading, error } = useFetch({
    url: "product/getProducts",
    method: "POST",
    body: fetchParams
  });
  
  useEffect(() => {
    fetchData();
    setSelectedProducts([]);
  }, [fetchParams]);

  useEffect(() => {
    if (data) {
      const productsResponse = data as unknown as GetProductsResponse;
      setProducts(productsResponse?.data || []);
      setProductsCounts(productsResponse?.counts || {
        totalProducts: 0,
        totalActiveProducts: 0,
        totalInactiveProducts: 0,
      });
      setTotalMatchedProducts(
        productsResponse?.totalMatchedProducts ?? productsResponse?.data?.length ?? 0
      );
      setPaginationInfo(productsResponse?.pagination ?? null);
    }
  }, [data]);



  const handleProductSelection = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      // Tout désélectionner
      setSelectedProducts([]);
    } else {
      // Tout sélectionner
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const handleDeleteClick = () => {
    if (selectedProducts.length === 0) return;
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/deleteProducts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds: selectedProducts.map(id => id.toString()) })
      });

      const result = await response.json();

      if (result.success) {
        // Réinitialiser la sélection après suppression
        setSelectedProducts([]);
        // Recharger la liste des produits
        fetchData();
      } else {
        alert(`Erreur: ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression des produits');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const toggleSort = (
    field: 'name' | 'price' | 'status' | 'type' | 'createdAt' | 'updatedAt'
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
      <h1 className={styles.title}><img src="/icons/tags.svg" alt="products"/>Produits</h1>

      <div className={styles.productsStats}>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, status: null, filter: { ...prev.filter, status: null } }))}>
          <p className={styles.label}>Produits</p>
          <p className={styles.value}>{productsCounts.totalProducts}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, status: null, filter: { ...prev.filter, status: 'active' } }))}>
          <p className={styles.label}>Actifs</p>
          <p className={styles.value}>{productsCounts.totalActiveProducts}</p>
        </div>
        <div className={styles.item} onClick={() => setFetchParams(prev => ({ ...prev, status: null, filter: { ...prev.filter, status: 'inactive' } }))}>
          <p className={styles.label}>Inactifs</p>
          <p className={styles.value}>{productsCounts.totalInactiveProducts}</p>
        </div>
      </div>

      <div className={styles.productsActions}>
        {/* <Button title="Importer" type="button" handleClick={() => {}} style="grey" />
        <Button title="Exporter" type="button" handleClick={() => {}} style="grey" /> */}
        <Button 
          title={`Supprimer${selectedProducts.length > 0 ? ` (${selectedProducts.length})` : ''}`} 
          type="button" 
          handleClick={handleDeleteClick} 
          style={selectedProducts.length > 0 ? "red" : "unavailable"} 
        />
        <Button title="Ajouter un produit" type="button" handleClick={() => { router.push('/products/add') }} style="black" />
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.productsHeader}>
          <CheckBox
            name="selectAll"
            id="selectAll"
            checked={selectedProducts.length === products.length && products.length > 0}
            onChange={handleSelectAll}
          />
          <p onClick={() => toggleSort('name')}>
            <span>Produits</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'name' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('price')}>
            <span>Prix</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'price' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
            />
          </p>
          <p onClick={() => toggleSort('status')}>
            <span>Status</span>
            <img
              src="/icons/arrow.svg"
              alt="tri"
              className={`${styles.sortIcon} ${fetchParams.sort?.sortBy === 'status' ? (fetchParams.sort?.sortOrder === 'asc' ? styles.sortIconAsc : styles.sortIconDesc) : styles.sortIconHidden}`}
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

        <div className={styles.productsList}>
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product.id);
            return (
              <div key={product.id} className={styles.productItem} onClick={() => router.push(`/products/${product.id}`)}>
                <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                  <CheckBox
                    name={`select-${product.id}`}
                    id={`select-${product.id}`}
                    checked={isSelected}
                    onChange={() => handleProductSelection(product.id)}
                  />
                </div>
                <p>{product.name}</p>
                <p>{product.price}€</p>
                <p>{product.status === 'active' ? 'Actif' : 'Inactif'}</p>
                <p>{formatDate(product.createdAt)}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.productsFooter}>
          <div>
            <p>{totalMatchedProducts} {totalMatchedProducts > 1 ? 'Résultats' : 'Résultat'}</p>
          </div>
          <div className={styles.productsFooterPages}>
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
        message={`Êtes-vous sûr de vouloir supprimer ${selectedProducts.length} produit(s) ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
      />
    </div>
  );
}
