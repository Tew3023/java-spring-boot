"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface Branch {
  id: number;
  branchName: string;
}

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


export default function BranchList() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [popup, setPopup] = useState(false);
  const [branch, setBranch] = useState<Branch>({ id: 0, branchName: "" });
  const [search, setSearch] = useState("");

  const componentRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(search, 500);

  // Correct implementation of useReactToPrint
  const handlePrint = useReactToPrint({ 
    contentRef: componentRef,
    documentTitle: "BranchList",
    pageStyle: "@media print { body { -webkit-print-color-adjust: exact; } }"
  });

  const getBranchData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/branch"); // เปลี่ยน URL API
      setBranches(result.data);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };

  useEffect(() => {
    getBranchData();
  }, []);

  const addBranchController = async () => {
    try {
      const res = await axios.post("http://localhost:8080/branch", branch); // เปลี่ยน URL API
      setBranches((prev) => [...prev, res.data]);
      setBranch({ id: 0, branchName: "" });
      setPopup(false);
      alert("เพิ่มสาขาร้านสำเร็จ!");
    } catch (error) {
      console.error("Error adding branch:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มสาขาร้าน!");
    }
  };

  const popupController = () => {
    setPopup((prev) => !prev);
  };

  const filteredItems = branches.filter((item)=> item.branchName.includes(debouncedSearch.toLocaleLowerCase()))
   

  return (
    <div className="bg-gray-100 p-8 rounded-lg min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between py-4 px-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold">Branch List</h2>
          <h2 className="text-2xl font-bold">Order List</h2>
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="search for order"
            className="p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition duration-200 bg-slate-200"
          />
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
                <th className="py-3 px-6 text-left">Branch Name</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredItems.length > 0 ? (
                filteredItems.map((branch) => (
                  <tr key={branch.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{branch.id}</td>
                    <td className="py-3 px-6">{branch.branchName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-3 px-6 text-center text-gray-500">
                    ไม่มีข้อมูลสาขาร้าน
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals (Add) */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Branch</h2>
            <label className="block mb-2">Branch Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={branch.branchName}
              onChange={(e) => setBranch({ ...branch, branchName: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={addBranchController}
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
