"use client"

import { useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/UI/Input";

export default function Index() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const handleCustomerSelection = (customerId: string) => {
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}><img src="/icons/user.svg" alt="customers"/>Clients</h1>

      <div className={styles.customersStats}>
        <div className={styles.item}>
          <p className={styles.label}>Clients</p>
          <p className={styles.value}>127</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Ont commandés</p>
          <p className={styles.value}>90</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>N'ont pas commandés</p>
          <p className={styles.value}>37</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Total de commandes</p>
          <p className={styles.value}>127</p>
        </div>
        <div className={styles.item}>
          <p className={styles.label}>Total de dépenses</p>
          <p className={styles.value}>1270€</p>
        </div>
      </div>

      <div className={styles.customersContainer}>
        <div className={styles.customersHeader}>
          <Input 
            type="checkbox" 
            name="selectAll" 
            id="selectAll" 
            value={""}
            onChange={() => {}}
          />
          <p>Client</p>
          <p>Addresse</p>
          <p>Total de dépenses</p>
          <p>Nombres de commandes</p>
          <p>Date de création</p>
        </div>

        <div className={styles.customersList}>

          <div className={styles.customerItem}>
            <Input 
              type="checkbox" 
              name="select-813" 
              id="select-813" 
              value={selectedCustomers.includes("813") ? "checked" : ""}
              onChange={() => handleCustomerSelection("813")}
            />
            <p>John Doe</p>
            <p>Anytown, USA</p>
            <p>230€</p>
            <p>1 Commande</p>
            <p>03/08/2025</p>
          </div>

          <div className={styles.customerItem}>
            <Input 
              type="checkbox" 
              name="select-812" 
              id="select-812" 
              value={selectedCustomers.includes("812") ? "checked" : ""}
              onChange={() => handleCustomerSelection("812")}
            />
            <p>Philippe Etshebest</p>
            <p>Paris, France</p>
            <p>430€</p>
            <p>2 Commandes</p>
            <p>02/08/2025</p>
          </div>

          <div className={styles.customerItem}>
            <Input 
              type="checkbox" 
              name="select-811" 
              id="select-811" 
              value={selectedCustomers.includes("811") ? "checked" : ""}
              onChange={() => handleCustomerSelection("811")}
            />
            <p>Philippe Etshebest</p>
            <p>Paris, France</p>
            <p>250€</p>
            <p>1 Commande</p>
            <p>02/08/2025</p>
          </div>

        </div>

        <div className={styles.customersFooter}>
          <div>
          </div>
        </div>
      </div>
    </div>
  );
}
