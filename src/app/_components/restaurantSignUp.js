import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './styles/RestaurantSignUp.module.css';

const RestaurantSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);   
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false);
        }

        if (!email || !password || !confirmPassword || !name || !city || !address || !contact) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        setLoading(true);  // Start loading

        const response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, city, address, contact })
        });

        const data = await response.json();
        setLoading(false);  // Stop loading
        console.log(data);

        if (data.success) {
            const { result } = data;
            delete result.password;
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/restaurant/dashboard");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.heading}>Sign Up</h3>
            <div className={styles.form}>
                <InputField
                    type="email"
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
                <InputField
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={passwordError && "Passwords do not match"}
                />
                <InputField
                    type="text"
                    placeholder="Enter restaurant name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={error && !name && "Please enter a valid name"}
                />
                <InputField
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={error && !city && "Please enter a valid city"}
                />
                <InputField
                    type="text"
                    placeholder="Enter full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={error && !address && "Please enter a valid address"}
                />
                <InputField
                    type="text"
                    placeholder="Enter contact number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    error={error && !contact && "Please enter a valid contact number"}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={handleSignup} disabled={loading}>
                        {loading ? <div className={styles.spinner}></div> : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ type, placeholder, value, onChange, error }) => (
    <div className={styles.inputGroup}>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
);

export default RestaurantSignUp;
