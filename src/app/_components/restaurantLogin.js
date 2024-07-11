import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles/RestaurantLogin.module.css";  

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);  
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    setLoading(true);  
    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, login: true }),
    });

    response = await response.json();
    setLoading(false); // Stop loading

    if (response.success) {
      const { result } = response;
      delete result.password;
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}> Restaurant Login</h3>
      <div className={styles.form}>
        <InputField
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error && !email && "Please enter a valid email"}
        />
        <InputField
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error && !password && "Please enter a valid password"}
        />
        <div className={styles.buttonWrapper}>
          <button
            onClick={handleLogin}
            className={styles.button}
            disabled={loading}
          >
            {loading ? <div className={styles.spinner}></div> : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable InputField component
const InputField = ({ type, placeholder, value, onChange, error }) => (
  <div className={styles.inputWrapper}>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.inputField} ${error ? styles.inputError : ""}`}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
);

export default RestaurantLogin;
