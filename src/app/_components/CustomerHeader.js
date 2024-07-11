"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles/CustomerHeader.module.css";

const CustomerHeader = (props) => {
  const [user, setUser] = useState(undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const userStorage =
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
    const cartStorage =
      localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
    setUser(userStorage);
    setCartNumber(cartStorage?.length || 0);
    setCartItem(cartStorage || []);
  }, []);

  useEffect(() => {
    if (props.cartData) {
      if (cartNumber) {
        if (cartItem[0].resto_id !== props.cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData]);

  useEffect(() => {
    if (props.removeCartData) {
      let localCartItem = cartItem.filter(
        (item) => item._id !== props.removeCartData
      );
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData]);

  useEffect(() => {
    if (props.removeCartData) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
    }
  }, [props.removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo}>
        <img
          style={{ width: 70, height:70 }}
          src="https://s6.imgcdn.dev/LM5dn.png"
          alt="LM5dn.png"
          border="0"
        />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/">
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/myprofile">
                {user?.name}
              </Link>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navButton} onClick={logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/">
                Login
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/user-auth">
                SignUp
              </Link>
            </li>
          </>
        )}
        <li className={styles.navItem}>
          <Link className={styles.navLink} href={cartNumber ? "/cart" : "#"}>
            Cart({cartNumber ? cartNumber : 0})
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/">
            Add Restaurant
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} href="/deliverypartner">
            Delivery Partner
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
