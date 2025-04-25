"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/order/Button";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // ถ้ามีการพิมพ์ใหม่ ล้าง timeout เดิม
  }, [value, delay]);

  return debouncedValue;
}

export default function OrderFood() {
  interface FoodsValue {
    id: number;
    fname: string;
    price: number;
  }

  const [foodItems, setFoodItems] = useState<FoodsValue[]>([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500); 

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/food");
        setFoodItems(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const filteredItems = foodItems.filter((item) =>
    item.fname.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">
        Order Your Favorite Food
      </h1>

      <p className="text-lg text-gray-600 text-center mb-6">
        Select from our delicious menu below. Simply click "Order Now" to add to
        your cart!
      </p>

      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for your food"
          className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No food items found.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.fname}
                </h2>
                <p className="text-gray-600 mt-2">${item.price}</p>
                <Button fid={item} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
