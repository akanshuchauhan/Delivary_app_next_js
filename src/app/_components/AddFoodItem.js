import { useState } from "react";
import styles from './styles/AddFoodItems.module.css';

const AddFoodItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

  const handleAddFoodItem = async () => {
    const newError = {};
    if (!name) newError.name = "Please enter a valid name.";
    if (!price || isNaN(price)) newError.price = "Please enter a valid price.";
    if (!path) newError.path = "Please enter a valid image path.";
    if (!description) newError.description = "Please enter a valid description.";
    
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    } else {
      setError({});
    }

    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }

    try {
      const response = await fetch("http://localhost:3000/api/restaurant/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, img_path: path, description, resto_id }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Food item added successfully!");
        props.setAddItem(false);
      } else {
        alert("Failed to add food item. Please try again.");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.addFoodContainer}>
      <h1 className={styles.addFoodTitle}>Add New Food Item</h1>
      <div className={styles.addFoodInputWrapper}>
        <input
          type="text"
          className={styles.addFoodInputField}
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error.name && <span className={styles.addFoodInputError}>{error.name}</span>}
      </div>
      <div className={styles.addFoodInputWrapper}>
        <input
          type="text"
          className={styles.addFoodInputField}
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error.price && <span className={styles.addFoodInputError}>{error.price}</span>}
      </div>
      <div className={styles.addFoodInputWrapper}>
        <input
          type="text"
          className={styles.addFoodInputField}
          placeholder="Enter image path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        {error.path && <span className={styles.addFoodInputError}>{error.path}</span>}
      </div>
      <div className={styles.addFoodInputWrapper}>
        <input
          type="text"
          className={styles.addFoodInputField}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error.description && <span className={styles.addFoodInputError}>{error.description}</span>}
      </div>
      <div className={styles.addFoodInputWrapper}>
        <button className={styles.addFoodButton} onClick={handleAddFoodItem}>Add Food Item</button>
      </div>
    </div>
  );
};

export default AddFoodItems;
