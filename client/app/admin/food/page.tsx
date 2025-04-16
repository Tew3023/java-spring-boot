"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface Food {
  id: number;
  fname: string;
  price: number;
}

interface Food2 {
  fname: string;
  price: number;
}

export default function FoodList() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editData, setEditData] = useState<Food | null>(null);
  const [popup, setPopup] = useState(false);
  const [food, setFood] = useState<Food2>({ fname: "", price: 0 });

  const componentRef = useRef<HTMLDivElement>(null);
  
  // Correct implementation of useReactToPrint
  const handlePrint = useReactToPrint({ 
    contentRef: componentRef,
    documentTitle: "FoodList",
    pageStyle: "@media print { body { -webkit-print-color-adjust: exact; } }"
  });

  const getFoodData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/food");
      setFoods(result.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    getFoodData();
  }, []);

  const deleteFood = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/food/${id}`);
      setFoods(foods.filter((food) => food.id !== id));
      alert("ลบรายการอาหารสำเร็จ!");
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("เกิดข้อผิดพลาดในการลบอาหาร!");
    }
  };

  const updateFood = async () => {
    if (!editData) return;
    try {
      await axios.put(`http://localhost:8080/food/${editData.id}`, {
        fname: editData.fname,
        price: editData.price,
      });
      setFoods(foods.map((f) => (f.id === editData.id ? editData : f)));
      setEditData(null);
      alert("อัปเดตรายการอาหารสำเร็จ!");
    } catch (error) {
      console.error("Error updating food:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตอาหาร!");
    }
  };

  const popupController = () => {
    setPopup((prev) => !prev);
  };

  const addFoodController = async () => {
    try {
      const res = await axios.post("http://localhost:8080/food", food);
      setFoods((prev) => [...prev, res.data]);
      setFood({ fname: "", price: 0 });
      setPopup(false);
      alert("เพิ่มอาหารสำเร็จ!");
    } catch (error) {
      console.error("Error adding food:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มอาหาร!");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between py-4 px-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold">Food List</h2>
          <div className="flex gap-2">
            <button
              onClick={popupController}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-lg"
            >
              +
            </button>
            <button 
              onClick={() => handlePrint()}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded text-lg"
            >
              Print
            </button>
          </div>
        </div>

        {/* Table - Wrapped with ref for printing */}
        <div ref={componentRef} className="overflow-x-auto p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Food Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <tr key={food.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{food.id}</td>
                    <td className="py-3 px-6">{food.fname}</td>
                    <td className="py-3 px-6">${food.price}</td>
                    <td className="py-3 px-6 text-center flex gap-2 justify-center print:hidden">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
                        onClick={() => setEditData(food)}
                      >
                        <Edit size={16} /> Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
                        onClick={() => deleteFood(food.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                    ไม่มีข้อมูลอาหาร
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals (Update & Add) */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Food</h2>
            <label className="block mb-2">Food Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.fname}
              onChange={(e) => setEditData({ ...editData, fname: e.target.value })}
            />
            <label className="block mb-2">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              value={editData.price}
              onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditData(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={updateFood}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Food</h2>
            <label className="block mb-2">Food Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={food.fname}
              onChange={(e) => setFood({ ...food, fname: e.target.value })}
            />
            <label className="block mb-2">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              value={food.price}
              onChange={(e) => setFood({ ...food, price: Number(e.target.value) })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={addFoodController}
              >
                Add
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={popupController}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}