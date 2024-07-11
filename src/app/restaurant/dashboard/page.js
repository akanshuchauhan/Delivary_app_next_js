// components/Dashboard.js
"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import AddFoodItems from "@/app/_components/AddFoodItem"; 
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div>
      <RestaurantHeader />
      <div className={styles.buttonGroup}>
        <button
          className={styles.dashboardButton}
          onClick={() => setAddItem(true)}
        >
          Add Food
        </button>
        <button
          className={styles.dashboardButton}
          onClick={() => setAddItem(false)}
        >
          Dashboard
        </button>
      </div>
      <div className={styles.content}>
        {addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList />}
      </div>
    </div>
  );
};

export default Dashboard;
