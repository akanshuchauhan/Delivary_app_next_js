'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import styles from './OrderSummary.module.css';

const Page = () => {
    const [userStorage, setUserStorage] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [cartStorage, setCartStorage] = useState(() => JSON.parse(localStorage.getItem('cart')));
    const [total, setTotal] = useState(() => {
        if (cartStorage?.length === 1) {
            return cartStorage[0].price;
        }
        return cartStorage?.reduce((a, b) => a.price + b.price, 0);
    });
    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!total) {
            router.push('/');
        }
    }, [total]);

    const orderNow = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart'));

        const user_id = user._id;
        const city = user.city;
        const foodItemIds = cart.map((item) => item._id).toString();

        let deliveryBoyResponse;
        try {
            const response = await fetch(`http://localhost:3000/api/deliverypartners/${city}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            deliveryBoyResponse = await response.json();
        } catch (error) {
            console.error("Error fetching delivery partners:", error);
            alert("An error occurred. Please try again later.");
            return;
        }

        const deliveryBoyIds = deliveryBoyResponse.result?.map((item) => item._id) || [];
        const deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

        if (!deliveryBoy_id) {
            alert("Delivery partner not available.");
            return;
        }

        const resto_id = cart[0].resto_id;
        const amount = total + DELIVERY_CHARGES + (total * TAX / 100);
        const collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status: 'confirm',
            amount,
        };

        try {
            const response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(collection)
            });
            const data = await response.json();
            if (data.success) {
                alert("Order confirmed.");
                setRemoveCartData(true);
                router.push('myprofile');
            } else {
                alert("Order failed. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className={styles.pageContainer}>
            <CustomerHeader removeCartData={removeCartData} />
            <div className={styles.orderSummary}>
                <div className={styles.userDetails}>
                    <h2>User Details</h2>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Name: </span>
                        <span className={styles.detailValue}>{userStorage.name}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Address: </span>
                        <span className={styles.detailValue}>{userStorage.address}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Mobile: </span>
                        <span className={styles.detailValue}>{userStorage.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Tax: </span>
                        <span className={styles.detailValue}>{((total * TAX) / 100).toFixed(2)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Delivery Charges: </span>
                        <span className={styles.detailValue}>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Total Amount: </span>
                        <span className={styles.detailValue}>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Cash on Delivery: </span>
                        <span className={styles.detailValue}>{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.orderActions}>
                    <button className={styles.orderButton} onClick={orderNow}>Place your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
