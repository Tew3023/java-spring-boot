"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Trash2, Edit } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface Order {
  id: number;
  customer: string;
  foodOrder: string;
  quantity: number;
  orderPrice: number;
  createdAt: string;
  branch: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editData, setEditData] = useState<Order | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "orderList",
    pageStyle: "@media print { body { -webkit-print-color-adjust: exact; } }"
  });

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/order");
        setOrders(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    getOrderData();
  }, []);

  const deleteOrder = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/order/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
      alert("ลบคำสั่งซื้อสำเร็จ!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("เกิดข้อผิดพลาดในการลบคำสั่งซื้อ!");
    }
  };

  const updateOrder = async () => {
    if (!editData) return;
    try {
      await axios.put(`http://localhost:8080/order/${editData.id}`, {
        customer: editData.customer,
        foodOrder: editData.foodOrder,
        quantity: editData.quantity,
        orderPrice: editData.orderPrice,
        branch: editData.branch,
      });
      setOrders(orders.map((order) => (order.id === editData.id ? editData : order)));
      setEditData(null);
      alert("อัปเดตคำสั่งซื้อสำเร็จ!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตคำสั่งซื้อ!");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg min-h-screen flex justify-center">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between py-4 px-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold">Order List</h2>
          <button
            onClick={() => handlePrint()}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded text-lg"
          >
            Print
          </button>
        </div>
        <div ref={componentRef} className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Food Order</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.foodOrder}</td>
                    <td className="py-3 px-4">{order.quantity}</td>
                    <td className="py-3 px-4">${order.orderPrice}</td>
                    <td className="py-3 px-4">{order.branch}</td>
                    <td className="py-3 px-4">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="py-3 px-4 text-center flex gap-2 justify-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
                        onClick={() => setEditData(order)}
                      >
                        <Edit size={16} /> Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
                        onClick={() => deleteOrder(order.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-3 px-6 text-center text-gray-500">
                    ไม่มีคำสั่งซื้อ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit */}
      {editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Order</h2>

            <label className="block mb-2">Customer</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.customer}
              onChange={(e) => setEditData({ ...editData, customer: e.target.value })}
            />

            <label className="block mb-2">Food Order</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.foodOrder}
              onChange={(e) => setEditData({ ...editData, foodOrder: e.target.value })}
            />

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              value={editData.quantity}
              onChange={(e) => setEditData({ ...editData, quantity: Number(e.target.value) })}
            />

            <label className="block mb-2">Price</label>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              value={editData.orderPrice}
              onChange={(e) => setEditData({ ...editData, orderPrice: Number(e.target.value) })}
            />

            <label className="block mb-2">Branch</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={editData.branch}
              onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
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
                onClick={updateOrder}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
