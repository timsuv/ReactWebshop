import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartItems = ({ data, quantity }) => {
  const { addToCart, removeFromCart, updateTheCartItemCount } = useContext(ShopContext);

  return (
    <div className="flex border-t-1 border-gray-300">
      <div className="p-3 bg-white w-full flex flex-col gap-5">
        <div className="h-46 flex justify-left items-center">
          <img className="w-36" src={data.imageLink} alt={data.name} />
        </div>
        <h2 className="font-bold">{data.name}</h2>
        <p className="font-semibold">{data.price} kr.</p>
      </div>
      <div className="flex flex-col justify-center items-end gap-5">
        <div className="flex items-center">
          <button
            className="cursor-pointer"
            onClick={() => removeFromCart(data.productId)}
          >
            -
          </button>
          <input
            className="text-center"
            value={quantity}
            onChange={(e) =>
              updateTheCartItemCount(Number(e.target.value), data.productId)
            }
          />
          <button
            className="cursor-pointer"
            onClick={() => addToCart(data.productId)}
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">
            {quantity * data.price}:- 
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
