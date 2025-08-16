"use client"

import { useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/UI/Input";

export default function Index() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleOrderSelection = (orderId: string) => {
  };
  
  return (
    <div className={styles.page}>
      <h1 className={styles.title}><img src="/icons/box.svg" alt="orders"/>Commandes</h1>

      <div className={styles.ordersStats}>
        <div className={styles.item}>
          <p className={styles.label}>Commandes</p>
          <p className={styles.value}>127</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Reussi</p>
          <p className={styles.value}>90</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>En cours</p>
          <p className={styles.value}>10</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Echouées</p>
          <p className={styles.value}>17</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Remboursées</p>
          <p className={styles.value}>10</p>
        </div>
      </div>

      <div className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
          <Input 
            type="checkbox" 
            name="selectAll" 
            id="selectAll" 
            value={""}
            onChange={() => {}}
          />
          <p>Commande</p>
          <p>Client</p>
          <p>Date</p>
          <p>Montant</p>
          <p>Statut de la commande</p>
          <p>Statut du paiement</p>
          <p>Addresse</p>
        </div>

        <div className={styles.ordersList}>

          <div className={styles.orderItem}>
            <Input 
              type="checkbox" 
              name="select-813" 
              id="select-813" 
              value={selectedOrders.includes("813") ? "checked" : ""}
              onChange={() => handleOrderSelection("813")}
            />
            <p>#813</p>
            <p>John Doe</p>
            <p>03/08/2025</p>
            <p>230€</p>
            <p>En préparation</p>
            <p>Réussi</p>
            <p>Anytown, USA</p>
          </div>

          <div className={styles.orderItem}>
            <Input 
              type="checkbox" 
              name="select-812" 
              id="select-812" 
              value={selectedOrders.includes("812") ? "checked" : ""}
              onChange={() => handleOrderSelection("812")}
            />
            <p>#812</p>
            <p>Philippe Etshebest</p>
            <p>02/08/2025</p>
            <p>210€</p>
            <p>En attente</p>
            <p>Échoué</p>
            <p>Paris, France</p>
          </div>

          <div className={styles.orderItem}>
            <Input 
              type="checkbox" 
              name="select-811" 
              id="select-811" 
              value={selectedOrders.includes("811") ? "checked" : ""}
              onChange={() => handleOrderSelection("811")}
            />
            <p>#811</p>
            <p>Philippe Etshebest</p>
            <p>02/08/2025</p>
            <p>250€</p>
            <p>Annulée</p>
            <p>Remboursée</p>
            <p>Paris, France</p>
          </div>

        </div>

        <div className={styles.ordersFooter}>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
