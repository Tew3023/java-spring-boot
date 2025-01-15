'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/order/Button";
export default function OrderFood() {
  interface FoodsValue {
    id: number;
    fname: string;
    price: number;
  }

  const [foodItems, setFoodItems] = useState<FoodsValue[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get('http://localhost:8080/food');
        setFoodItems(result.data);
        console.log(result)
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Order Your Favorite Food</h1>
      
      <p className="text-lg text-gray-600 text-center mb-12">
        Select from our delicious menu below. Simply click "Order Now" to add to your cart!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{item.fname}</h2>
              <p className="text-gray-600 mt-2">${item.price}</p>
              <Button fid={item}  />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
