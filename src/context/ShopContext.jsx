import React, { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/Fetch";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  // Initialize cart with product IDs fetched from the API
  return products.reduce((cart, product, index) => {
    cart[product.productId] = 0; // Use productId instead of index
    return cart;
  }, {});
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);

  // Fetch products from API and initialize cart
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setCartItems(getDefaultCart(fetchedProducts)); // Initialize cart with fetched product IDs

      const savedCart = JSON.parse(localStorage.getItem("cartItems"));
      const initializedCart = savedCart || getDefaultCart(fetchedProducts);
      setCartItems(initializedCart);
    };

    loadProducts();
  }, []);

  // Store cart items in localStorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, products]);

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: prev[productId] - 1,
    }));
  };

  const updateTheCartItemCount = (newAmount, productId) => {
    if (newAmount < 0) {
      return;
    }
    setCartItems((prev) => ({
      ...prev,
      [productId]: newAmount,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find((product) => product.productId === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateTheCartItemCount,
    getTotalCartAmount,
    products,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
