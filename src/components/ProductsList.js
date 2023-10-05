import { useEffect, useState } from "react";
import ProductsFeed from "./ProductsFeed";
import { Link } from "react-router-dom";
const ProductsList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    //console.log("this is json products",json.products);
    setProducts(json.products);
  };
  return (
    <>
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[40px] mx-auto">
        <img
          className="md:col-span-full"
          src="https://links.papareact.com/dyz"
          alt=""
        />
      </div>
      <div className="m-auto">
        <div className="flex flex-wrap shadow-lg">
          {products.map((product) => (
            <Link to={`product/${product.id}`}><ProductsFeed key={product.id} product={product} /></Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductsList;
