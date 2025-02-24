import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { fetchProducts } from "../services/Fetch";

const CartItems = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const { cartItems, addToCart, removeFromCart, updateTheCartItemCount } =
    useContext(ShopContext);

  // Filter products based on cartItems to display only those in the cart
  const cartProducts = products.filter((product) => cartItems[product.productId] > 0);

  return (
    <div>
      {cartProducts.map((product) => (
        <div key={product.productId} className="flex border-t-1 border-gray-300">
          <div className="p-3 bg-white w-full flex flex-col gap-5">
            <div className="h-46 flex justify-left items-center">
              <img className="w-36" src={product.imageLink} alt={product.name} />
            </div>
            <h2 className="font-bold">{product.name}</h2>
            <p className="font-semibold">{product.price} kr.</p>
          </div>
          <div className="flex flex-col justify-center items-end gap-5">
            <div className="flex items-center">
              <button
                className="cursor-pointer"
                onClick={() => removeFromCart(product.productId)}
              >
                -
              </button>
              <input
                className="text-center"
                value={cartItems[product.productId] || 0} // Default to 0 if no item in the cart
                onChange={(e) =>
                  updateTheCartItemCount(Number(e.target.value), product.productId)
                }
              />
              <button
                className="cursor-pointer"
                onClick={() => addToCart(product.productId)}
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold">
                {cartItems[product.productId] * product.price}:- 
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
