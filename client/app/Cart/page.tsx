'use client'
import { useEffect, useState } from "react";
import Button from "../components/cart/Button";


interface orderValue {
  id: number;
  fname: string;
  price: number;
}
export default function Cart() {
  const [cartItems, setCartItems] = useState<orderValue[]>([]);

  useEffect(() => {
    const result = localStorage.getItem("order")
    if(result){
      setCartItems(JSON.parse(result))
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * 1, 0).toFixed(2);
  };

  const deleteItem = (index:number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("order", JSON.stringify(updatedCart)); // Update localStorage
  }

  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Ready to get your Food at your Face. EatThisSheet.
        </p>
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-6">
            {cartItems.map((item,index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-medium w-20">{item.fname}</div>
                  <div className="text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* <button
                   
                    className="px-2 py-1 border rounded-lg text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button> */}
                  <div>1</div>
                  {/* <button
                    className="px-2 py-1 border rounded-lg text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button> */}
                  <button
                  onClick={()=>{deleteItem(index)}}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
            <Button />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          Your cart is empty. Start adding items to your cart!
        </div>
      )}
    </div>
  );
}
