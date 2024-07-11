"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import DeliveryLogin from "../_components/DeliveryLogin";
import DeliverySignUp from "../_components/DeliverySignUp";
import styles from "./DeliveryPage.module.css";

const DeliveryPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (delivery) {
      router.push("/deliverydashboard");
    }
  }, [router]);

  return (
    <div className={styles.page}>
      {/* <DeliveryHeader/> */}
      <div className={styles.container}>
        <h1>Delivery Partner</h1>
        <div className={styles.toggleWrapper}>
          <button
            className={isLogin ? styles.active : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? styles.active : ""}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <div className={styles.formWrapper}>
          {isLogin ? <DeliveryLogin /> : <DeliverySignUp />}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
