import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartItems = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateTheCartItemCount } =
    useContext(ShopContext);

    

  return (
    <>
      <div className="flex border-t-1 border-gray-300 ">
        <div className=" p-3  bg-white w-full flex flex-col gap-5">
          <div className="h-46 flex justify-left items-center">
            <img className="w-36" src={productImage} alt="" />
          </div>
          <h2 className="font-bold">{productName}</h2>
          <p className="font-semibold">{price} kr.</p>
        </div>
        <div className="flex flex-col justify-center items-end gap-5">
          <div className="flex items-center">
            <button
              className=" cursor-pointer"
              onClick={() => removeFromCart(id)}
            >
              -
            </button>
            <input
              className="text-center "
              value={cartItems[id]}
              onChange={(e) =>
                updateTheCartItemCount(Number(e.target.value), id)
              }
            />
            <button className=" cursor-pointer" onClick={() => addToCart(id)}>
              +
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">{cartItems[id] * price}:- </p>
            
          </div>
        </div>
        
      </div>
      
    </>
  );
};

export default CartItems;
