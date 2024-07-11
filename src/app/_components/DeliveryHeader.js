"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles/DeliveryHeader.module.css";

const DeliveryHeader = () => {
  const [details, setDetails] = useState(null);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("delivery");
    if (data) {
      setDetails(JSON.parse(data));
    } else if (pathName !== "/delivery") {
      router.push("/deliverydashboard");
    }
  }, [pathName, router]);

  const logout = () => {
    localStorage.removeItem("delivery");
    router.push("/deliverydashboard");
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo}>
        <Link href="/deliverydashboard">
          <img
            src="https://imgcdn.dev/i/LM5dn"
            alt="Delivery Partner Logo"
            className={styles.logoImage}
          />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/deliverydashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/deliveries">Deliveries</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        {details ? (
          <li className={styles.logoutButton} onClick={logout}>
            Logout
          </li>
        ) : (
          <li>
            <Link href="/deliverylogin">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DeliveryHeader;
