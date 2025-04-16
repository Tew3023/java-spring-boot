"use client";
import axios from "axios";
import { useEffect, useState , useRef } from "react";
import { Trash2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);
  
      const handlePrint = useReactToPrint({ 
        contentRef: componentRef,
        documentTitle: "UsersList",
        pageStyle: "@media print { body { -webkit-print-color-adjust: exact; } }"
      });
  

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await axios.get("http://localhost:8080/user");
        setUsers(result.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUserData();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("ลบผู้ใช้สำเร็จ!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("เกิดข้อผิดพลาดในการลบผู้ใช้!");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-between py-4 px-6 border-b bg-gray-50">
          <h2 className="text-2xl font-bold">User List</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePrint()}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded text-lg"
            >
              Print
            </button>
          </div>
        </div>
        <div ref={componentRef} className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{user.id}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.role}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded flex items-center gap-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                    ไม่มีข้อมูลผู้ใช้
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
