import { fetchProducts } from "../services/Fetch";
import { ShopContext } from "../context/ShopContext";
import { useEffect, useState, useContext } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const products = await fetchProducts();
        if (products) {
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1 className="text-2xl text-center p-4">Rebranded Apple Shop</h1>

      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 p-3">
        {products.map((product) => {
          const cartItemAmount = cartItems[product.productId];

          return (
            <div
              className="flex flex-col items-center justify-center p-4 border-4 rounded-2xl border-gray-300 gap-4 bg-white"
              key={product.productId}
            >
              {cartItemAmount > 0 && (
                <div className="flex w-full justify-end">
                  <div className="bg-green-500 border-0 h-6 w-6 rounded-xl p-2 flex items-center justify-center text-white">
                    {cartItemAmount > 0 && <>{cartItemAmount}</>}
                  </div>
                </div>
              )}

              <div className="h-46 flex justify-center items-center">
                <img
                  className="w-36"
                  src={product.imageLink}
                  alt={product.name}
                />
              </div>

              <h2 className="font-bold">{product.name}</h2>
              <p className="font-semibold">{product.price} kr:-</p>
              <button
                onClick={() => addToCart(product.productId)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer flex justify-center items-center gap-2"
              >
                Add to cart
                <box-icon color="#ffff" type="solid" name="cart-add"></box-icon>
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
