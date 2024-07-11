// EditFoodItems.js

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./editFoodItems.module.css";

const EditFoodItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleLoadFoodItem();
  }, []);

  const handleLoadFoodItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`
      );
      const data = await response.json();
      if (data.success) {
        setName(data.result.name);
        setPrice(data.result.price);
        setPath(data.result.img_path);
        setDescription(data.result.description);
      } else {
        console.error("Failed to fetch food item for editing.");
      }
    } catch (error) {
      console.error("Error fetching food item:", error);
    }
  };

  const handleEditFoodItem = async () => {
    if (!name || !price || !path || !description) {
      setError(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, price, img_path: path, description }),
        }
      );
      const data = await response.json();
      if (data.success) {
        router.push("../dashboard");
      } else {
        alert("Failed to update food item. Please try again.");
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      alert("Failed to update food item. Please try again.");
    }
  };

  return (
    
    <div className={styles.editFoodItemContainer}>
      <h1>Update Food Item</h1>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && (
          <span className={styles.inputError}>Please enter valid name</span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <span className={styles.inputError}>Please enter valid price</span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error && !path && (
          <span className={styles.inputError}>Please enter valid path</span>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && !description && (
          <span className={styles.inputError}>
            Please enter valid description
          </span>
        )}
      </div>
      <div className={styles.btn}>
        <div className={styles.inputWrapper}>
          <button className={styles.button} onClick={handleEditFoodItem}>
            Update Food Item
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <button
            className={styles.button}
            onClick={() => router.push("../dashboard")}
          >
            Back to Food Item list
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFoodItems;
