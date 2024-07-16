'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/DeliverySignUp.module.css';

const DeliverySignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobile, password, city, address })
      });
      response = await response.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem('delivery', JSON.stringify(result));
        router.push('../deliverydashboard');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3> Signup</h3>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter name"  
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter mobile"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputWrapper}>
        <button onClick={handleSignUp} className={styles.btn}>Signup</button>
      </div>
    </div>
  );
};

export default DeliverySignUp;
