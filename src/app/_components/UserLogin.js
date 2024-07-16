'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles/UserLogin.module.css";  
const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginHandle = async () => {
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
    });
    response = await response.json();
    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props?.redirect?.order) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("failed to login. Please try again with valid email and password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
      <h2 className={styles.title}>User Login</h2>
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <button onClick={loginHandle} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
