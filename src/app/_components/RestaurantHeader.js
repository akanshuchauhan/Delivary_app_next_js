import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles/RestaurantHeader.module.css";
const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    }

    if (data) {
      setDetails(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.logo}>
     

        <img src="https://s6.imgcdn.dev/LM5dn.png" alt="LM5dn.png" border="0" />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          {details && details.name ? (
            <>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/">Login/SignUp</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default RestaurantHeader;
