import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductImage from "./ProductImage";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/redux/cartSlice";
import Header from "./Header";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [imageIndex,setImageIndex] = useState(0)
  const  dispatch=useDispatch();
  const getProductDetails = async () => {
    const data = await fetch(`https://dummyjson.com/products/${id}`);
    const json = await data.json();
    setProductData(json);
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  const handleImage = (i) => {
    setImageIndex(i);
  };
  // const onAddToCart=(productData)=>{
  //   dispatch(onAddToCart({}));
  // }
   
   if(Object.keys(productData).length ===0){
    return null;
   }
  return (
    !!productData && (
      <>
			<Header/>
        <div className="flex  items-center justify-center min-h-screen">
          <div className="w-1/2 flex justify-center">
            <div className="space-y-4">
              {(productData || []).images.map((image, i) => {
                return (
                  <div key={i} className="bg-gray-200 p-4 rounded-lg ">
                    <img 
                      onClick={() => handleImage(i)}
                      src={image}
                      alt="Other Product 1"
                      className="w-10 h-10"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <ProductImage index={imageIndex} data={productData} />

            <h2 className="text-lg font-semibold mt-4">{productData.title}</h2>

            <div className="text-xl font-bold text-gray-800 mt-2">
              {productData.price}
            </div>

            <p className="text-gray-600 mt-2">{productData.description}</p>

            <button onClick={() => dispatch(addToCart(productData))} className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Add to Cart
            </button>
          </div>
        </div>
      </>
    )
  );
};
export default ProductDetail;
