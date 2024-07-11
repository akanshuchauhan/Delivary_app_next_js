'use client';
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";

const Page = (props) => {
    const name = props.params.name;
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds, setCartIds] = useState(cartStorage ? cartStorage.map((cartItem) => cartItem._id) : []);
    const [removeCartData, setRemoveCartData] = useState();

    console.log(cartIds);

    useEffect(() => {
        loadRestaurantDetails();
    }, []);

    const loadRestaurantDetails = async () => {
        try {
            const id = props.searchParams.id;
            let response = await fetch(`http://localhost:3000/api/customer/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();
            if (data.success) {
                setRestaurantDetails(data.details);
                setFoodItems(data.foodItems);
            } else {
                console.error('Failed to fetch restaurant details:', data.message);
            }
        } catch (error) {
            console.error('Error loading restaurant details:', error);
        }
    };

    const addToCart = (item) => {
        let localCartIds = [...cartIds, item._id];
        setCartIds(localCartIds);
        setCartData(item);
        setRemoveCartData();
    };

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        let localIds = cartIds.filter(item => item !== id);
        setCartData();
        setCartIds(localIds);
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="details-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-list-wrapper">
                {foodItems.length > 0 ? foodItems.map((item) => (
                    <div className="list-item" key={item._id}>
                        <div><img style={{ width: 100 }} src={item.img_path} alt={item.name} /></div>
                        <div>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div className="description">{item.description}</div>
                            {cartIds.includes(item._id) ? (
                                <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                            ) : (
                                <button onClick={() => addToCart(item)}>Add to Cart</button>
                            )}
                        </div>
                    </div>
                )) : (
                    <h1>No Food Items for this Restaurant</h1>
                )}
            </div>
        </div>
    );
};

export default Page;
