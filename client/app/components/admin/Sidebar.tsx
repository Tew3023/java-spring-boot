'use client'
import axios from 'axios';


export default function Sidebar() {

  const deleteCookie = async () => {
    try{
      await axios.get('http://localhost:8080/deleteCookie')
      location.replace('/')
    }catch(err){
      console.error("Error deleting cookies:", err);
    }
  }

  return (
    <div className="sticky top-0 w-1/4 h-screen z-50 backdrop-blur-xl bg-white/20 border-r border-gray-300 shadow-lg">
      <h1 className="p-10 text-center text-4xl font-bold text-gray-900">
        EATTHISSHEET
      </h1>
      <div className="flex flex-col px-10">
        <a href={'/admin'} className="py-3 cursor-pointer text-lg text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200 text-center">
          Dashboard
        </a>
        <a href={'/admin/user'} className="py-3 cursor-pointer text-lg text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200 text-center">
          Users
        </a>
        <a href={'/admin/food'} className="py-3 cursor-pointer text-lg text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200 text-center">
          Foods
        </a>
        <a href={'/admin/order'} className="py-3 cursor-pointer text-lg text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200 text-center">
          Orders
        </a>
        <a href={'/admin/branch'} className="py-3 cursor-pointer text-lg text-gray-800 hover:bg-gray-200 rounded-lg transition duration-200 text-center">
          Branchs
        </a>
        <button
        onClick={deleteCookie}
          className="py-3 cursor-pointer text-lg text-red-500 hover:bg-gray-200 rounded-lg transition duration-200 text-center"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
