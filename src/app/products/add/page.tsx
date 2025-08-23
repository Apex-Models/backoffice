"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/Dropdown";
import useFetch from "@/components/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();

  const productForm = useState({
    name: "",
    description: "",
    extras: [],
    images: [],
    categories: [],
    price: 0,
    type: "",
    status: "",
  })

  const categories = [
    { name: "berline", value: "sedan" },
    { name: "compact", value: "compact" },
    { name: "break", value: "break" },
    { name: "coupé", value: "coupe" },
    { name: "cabriolet", value: "convertible" },
    { name: "utilitaire", value: "utility" },
    { name: "SUV", value: "suv" },
    { name: "monospace", value: "minivan" },
    { name: "sport", value: "sport" },
  ]

  return (
    <div className={styles.page}>
        <h1 className={styles.title}><img src="/icons/tags.svg" alt="products"/>Ajouter un produit</h1>

        <div className={styles.wrapper}>
            <p>Nom</p>
            <Input name="name" id="name" value="" placeholder="Nom" type="text" onChange={() => {}}/>
            <p>Déscription</p>
            <Input name="description" id="description" value="" placeholder="Déscription" type="text" onChange={() => {}}/>
            <p>Extras</p>
            <Button title="Ajouter un extra" type="button" handleClick={() => {}} />

            <p>Images</p>

            <p>Catégories</p>
            <div className={styles.categoryWrapper}>
                {categories.map((category) => (
                <Button title={category.name} type="button" handleClick={() => {}} key={category.value}/>
                ))}
            </div>
            
            <p>Prix</p>
            <Input name="price" id="price" value="" placeholder="Prix" type="number" onChange={() => {}}/>
            <p>type</p>
            
            <p>status</p>
            <Dropdown
                options={[
                    { value: 'active', label: 'Actif' },
                    { value: 'inactive', label: 'Inactif' }
                ]}
                value={""}
                placeholder="Statut"
                onChange={() => {}}
            />
        </div>
    </div>
  );
}
