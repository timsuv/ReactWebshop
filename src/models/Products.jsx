import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import {  fetchProducts } from "../services/Fetch";

const Products = (props) => {
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[id];

  const [products, setProducts] = useState();

  useEffect(()=>{
    const getData = async () =>{
      try{
        const products = await fetchProducts();
        if(products){
          setProducts(products);
        }
      }
      catch(error){
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center p-4 border-4 rounded-2xl border-gray-300 gap-4 bg-white">
      {
        cartItemAmount > 0 && (
            <div className="flex w-full justify-end ">
            <div className="bg-green-500 border-0 h-6 w-6 rounded-xl p-2 flex items-center justify-center text-white">{cartItemAmount > 0 && <> {cartItemAmount}</>}</div>
          </div>
        )
      }
      <div className="h-46 flex justify-center items-center">
        <img className=" w-36 " src={products.name} alt="" />
      </div>

      <h2 className="font-bold">{productName}</h2>
      <p className="font-semibold">{price} kr.</p>
      <button
        onClick={() => addToCart(id)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer flex justify-center items-center gap-2"
      >
        Add to cart
        <box-icon color="#ffff" type="solid" name="cart-add"></box-icon>
      </button>
    </div>
  );
};

export default Products;
