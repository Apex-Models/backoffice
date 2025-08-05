import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}><img src="/icons/home.svg" alt="home"/>Accueil</h1>
    </div>
  );
}
