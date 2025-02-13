import { PRODUCTS } from "../products";
import  Products  from "../models/Products";
const Home = () => {
  return (
    <>

    <h1 className="text-2xl text-center p-4">Rebranded Apple Shop</h1>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 p-3">
        {PRODUCTS.map((product, index) => (
          <Products key={index} data={product} />
        ))}
      </div>
      
    </>
  );
};

export default Home;
