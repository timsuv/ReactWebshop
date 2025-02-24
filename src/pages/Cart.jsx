import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartItem from "../models/CartItems";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/Fetch";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Fetch products only once when the component mounts
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
  }, []); // This will run only once on mount

  return (
    <div className="p-4">
      <div className="items-center justify-center p-12 border-4 rounded-2xl border-gray-300 gap-4 bg-white w-full">
        {totalAmount > 0 ? (
          <>
            <h1 className="text-3xl text-center p-4">Your cart items</h1>
            <div>
              {/* Loop through cartItems and render only the items in the cart */}
              {Object.keys(cartItems).map((productId) => {
                const product = products.find(
                  (p) => p.productId === Number(productId)
                );

                if (product && cartItems[productId] > 0) {
                  return (
                    <CartItem
                      key={product.productId} // Ensure unique key for each product
                      data={product}
                      quantity={cartItems[productId]}
                    />
                  );
                }
                return null;
              })}
            </div>

            <div className="flex justify-between gap-4 p-4 font-bold border-t-2">
              <p className="text-2xl">TOTAL</p>
              <p className="text-2xl">{totalAmount}:-</p>
            </div>

            <div className="flex justify-center gap-4 p-4">
              <button
                onClick={() => navigate("/ReactWebshop/")}
                className="border-3 border-gray-400 bg-white rounded-2xl p-2 hover:bg-blue-500 cursor-pointer hover:text-white"
              >
                Continue Shopping
              </button>
              <button className="border-3 border-gray-400 bg-white rounded-2xl p-2 hover:bg-green-500 cursor-pointer hover:text-white">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl text-center p-4">Your cart is empty</h1>
            <button
              onClick={() => navigate("/ReactWebshop/")}
              className="border-3 border-gray-400 bg-white rounded-2xl p-2 hover:bg-blue-500 cursor-pointer hover:text-white"
            >
              Return to the Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
