'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/DeliveryLogin.module.css';

const DeliveryLogin = () => {
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const router = useRouter();

  const loginHandle = async () => {
    try {
      let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
      });
      response = await response.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem('delivery', JSON.stringify(result));
        router.push('/deliverydashboard');
      } else {
        alert('Failed to login. Please try again with valid mobile and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3>Login</h3>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter mobile"
          value={loginMobile}
          onChange={(event) => setLoginMobile(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Enter password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <button onClick={loginHandle} className={styles.button}>Login</button>
      </div>
    </div>
  );
};

export default DeliveryLogin;
