"use client";
import { useEffect, useState } from "react";
import Button from "../components/cart/Button";
import { CheckCircle } from "lucide-react";
import axios from "axios";

interface orderValue {
  id: number;
  fname: string;
  price: number;
  quantity: number;
}

interface pOrder {
  id: number;
  customer: string;
  foodOrder: string;
  orderPrice: number;
  quantity: number;
  createAt: number;
  branch: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<orderValue[]>([]);
  const [paidOrders, setPaidOrders] = useState<pOrder[]>([]);

  useEffect(() => {
    const result = localStorage.getItem("order");
    if (result) {
      setCartItems(JSON.parse(result));
    }

    const paidData = localStorage.getItem("paidOrders");
    if (paidData) {
      setPaidOrders(JSON.parse(paidData));
    }
  }, []);

  useEffect(()=>{
    const paidFoods2 = async () => {
      try {
        const result = await axios.get("http://localhost:8080/order/myOrders", { withCredentials: true });
        setPaidOrders(result.data);
      } catch (error) {
        console.error("Error fetching paid orders:", error);
      }
    };
    paidFoods2();
  },[])

  const paidFoods = async () => {
    setCartItems([]);
    localStorage.removeItem("order");

    try {
      const result = await axios.get("http://localhost:8080/order/myOrders", { withCredentials: true });
      setPaidOrders(result.data);
    } catch (error) {
      console.error("Error fetching paid orders:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal2 = () => {
    return paidOrders
      .reduce((total, item) => total + item.orderPrice, 0)
      .toFixed(2);
  };

  const deleteItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("order", JSON.stringify(updatedCart));
  };

  const changeQuantity = (id: number, amount: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + amount) };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("order", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Ready to get your Food at your Face. EatThisSheet.
      </p>
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-medium w-20">{item.fname}</div>
                  <div className="text-gray-600">${item.price}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => changeQuantity(item.id, -1)}
                    className="px-2 py-1 border rounded-lg text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <div>{item.quantity}</div>
                  <button
                    onClick={() => changeQuantity(item.id, 1)}
                    className="px-2 py-1 border rounded-lg text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
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
            <Button pfood={paidFoods} />
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          Your cart is empty. Start adding items to your cart!
        </div>
      )}

{paidOrders.length > 0 && (
  <div className="mt-12">
    <h2 className="text-2xl font-bold text-green-600 flex items-center">
      <CheckCircle size={24} className="mr-2" /> Paid Orders
    </h2>

    <div className="space-y-4 mt-4">
      {paidOrders.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b pb-2"
        >
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{item.foodOrder}</span>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>Quantity: x{item.quantity}</span>
              <span>Price: ${item.orderPrice}</span>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {item.branch}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-8">
      <h2 className="text-2xl font-bold">
        Paid total: ${calculateTotal2()}
      </h2>
    </div>
  </div>
)}

    </div>
  );
}
