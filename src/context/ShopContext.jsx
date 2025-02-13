import React, { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : Object.fromEntries(PRODUCTS.map((_, i) => [i + 1, 0]));
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
    const addToCart = (itemID) =>{
        setCartItems((prev)=>({...prev, [itemID]: prev[itemID] + 1}));
    };
    const removeFromCart = (itemID) =>{
        setCartItems((prev)=>({...prev, [itemID]: prev[itemID] - 1}));
    };
    const updateTheCartItemCount = (newAmount, itemID) =>{
        if(newAmount < 0){
            return;
        }
        setCartItems((prev)=>({...prev, [itemID]: newAmount}));
    };
    const getTotalCartAmount = () =>{
        let totalamount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
               let itemInfo =PRODUCTS.find((product) => product.id === Number(item));
               totalamount += cartItems[item] * itemInfo.price;
            }
        }
        return totalamount;
    };

const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateTheCartItemCount,
    getTotalCartAmount

}

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
