import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart,removeToCart } from '../utils/redux/cartSlice'; // Import your action creators

const Cart = () => {
  const productData = useSelector((store) => store.cart.items);
  const dispatch = useDispatch(); // Initialize dispatch

  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(productData);
  }, [productData]);

  const updateCart = (product, operation) => {
    if (operation === 'add') {
      setCart([...cart, product]);
      dispatch(addToCart(product)); // Dispatch addToCart action
    } else if (operation === 'remove') {
      setCart(cart.filter((item) => item.id !== product.id));
      dispatch(removeToCart(product)); // Dispatch removeToCart action
    }
  };

  const totalAmount = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <div className="max-w-screen-lg  mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {productData.map((product) => (
        <div key={product.id} className="border-b-2 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-16 h-16 object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => updateCart(product, 'remove')}
            >
              -
            </button>
            <span>{product.quantity || 0}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => updateCart(product, 'add')}
            >
              +
            </button>
          </div>
        </div>
      ))}
      {cart.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b-2 py-2">
              <div className="flex items-center space-x-2">
                <img src={item.images[0]} alt={item.title} className="w-12 h-12 object-cover" />
                <p>{item.title}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => updateCart(item, 'remove')}
                >
                  Remove
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => updateCart(item, 'add')}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-xl font-semibold">Total Items: {cart.length}</p>
            <p className="text-xl font-semibold">Total Cost: ${totalAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
