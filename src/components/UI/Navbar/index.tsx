import styles from "./index.module.scss";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    children?: ReactNode;
}

const Navbar = ({ children }: NavbarProps) => {
    const pathname = usePathname();

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <div className={styles.linksList}>
                    <Link href="/" className={`${styles.navbarButton} ${pathname === '/' ? styles.active : ''}`}><img src="/icons/home.svg" alt="home"/>Accueil</Link>
                    <Link href="/orders" className={`${styles.navbarButton} ${pathname === '/orders' ? styles.active : ''}`}><img src="/icons/cart.svg" alt="orders"/>Commandes</Link>
                    <Link href="/products" className={`${styles.navbarButton} ${pathname === '/products' ? styles.active : ''}`}><img src="/icons/tags.svg" alt="products"/>Produits</Link>
                    {/* <Link href="/discounts" className={`${styles.navbarButton} ${pathname === '/discounts' ? styles.active : ''}`}><img src="/icons/coupon.svg" alt="discounts"/>Promotions</Link> */}
                    <Link href="/customers" className={`${styles.navbarButton} ${pathname === '/customers' ? styles.active : ''}`}><img src="/icons/user.svg" alt="customers"/>Clients</Link>
                    {/* <Link href="/deliveries" className={`${styles.navbarButton} ${pathname === '/deliveries' ? styles.active : ''}`}><img src="/icons/box.svg" alt="deliveries"/>Livraisons</Link> */}
                    {/* <Link href="/marketing" className={`${styles.navbarButton} ${pathname === '/marketing' ? styles.active : ''}`}><img src="/icons/chart-pie.svg" alt="marketing"/>Marketing</Link> */}
                    {/* <Link href="/monitoring" className={`${styles.navbarButton} ${pathname === '/monitoring' ? styles.active : ''}`}><img src="/icons/chart-horizontal.svg" alt="monitoring"/>Monitoring</Link> */}
                </div>
                <Link href="/settings" className={`${styles.navbarButton} ${pathname === '/settings' ? styles.active : ''}`}><img src="/icons/settings.svg" alt="settings"/>Paramètres</Link>
            </div>
            <div className={styles.navbarRight}>
                {children}
            </div>
        </div>
    );
}

export default Navbar;