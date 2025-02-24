
export const fetchProducts = async () => {
  try {
    const response = await fetch(`https://localhost:7173/products`);
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);
  }
};
