"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import "./style.css";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div  >
        <RestaurantHeader />

        <div className="form-container">
          {login ? <RestaurantLogin /> : <RestaurantSignUp />}
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
