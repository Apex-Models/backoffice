import Input from "@/components/UI/Input";
import styles from "./index.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <h1>APEX</h1>
            </div>
            <Input name="search" id="search" value="" placeholder="Rechercher" type="text" style="black" icon="/icons/search.svg" onChange={() => {}}/>
            <div className={styles.headerRight}>
                <div className={styles.headerButton}><img src="/icons/bell.svg" alt="notification"/></div>
                <div className={styles.headerButton}><p className={styles.headerNameIcon}>CL</p>Clément</div>
            </div>

        </div>
    );
}

export default Header;