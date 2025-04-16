import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface orderValue {
  id: number;
  fname: string;
  price: number;
  quantity: number;
}

interface branchData {
  id: number;
  branchName: string;
}

interface ButtonProps {
  pfood: () => void;
}

export default function Button({ pfood }: ButtonProps) {
  const [popup, setPopup] = useState(false);
  const [branch, setBranch] = useState<branchData[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);


  const addToDataBase = async () => {
    try {
      const userResponse = await fetch("http://localhost:8080/user/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const userData = await userResponse.json();

      if (!userData.success) {
        Swal.fire({
          icon: "warning",
          title: "Not logged in",
          text: "Please login before purchasing.",
          confirmButtonText: "OK",
        });
        return;
      }

      const userEmail = userData.email;
      const order = localStorage.getItem("order");
      if (!order) {
        console.warn("No order found in localStorage.");
        return;
      }

      const orderParsed: orderValue[] = JSON.parse(order);
      const orderFormated = orderParsed.map((order) => ({
        customer: userEmail,
        foodOrder: order.fname,
        orderPrice: order.price * order.quantity,
        quantity: order.quantity,
        branch: selectedBranchId
      }));

      for (const order of orderFormated) {
        await axios.post("http://localhost:8080/order", order);
        console.log(`Order item added: ${order.foodOrder}`);
      }

      pfood();
    } catch (err) {
      console.error("An error occurred while processing orders:", err);
    }
  };

  const controllPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  useEffect(() => {
    const getBranchData = async () => {
      const res = await axios.get("http://localhost:8080/branch");
      try {
        setBranch(res.data);
      } catch (err) {
        console.error("An error occurred while processing orders:", err);
      }
    };
    getBranchData();
  }, []);

  return (
    <>
     {popup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
      <h2 className="text-lg font-semibold mb-4">
        Choose your restaurant location
      </h2>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {branch.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedBranchId(item.branchName)}
            className={`cursor-pointer px-4 py-2 rounded-lg border transition-all duration-150 ${
              selectedBranchId === item.branchName
                ? "bg-green-500 text-white border-green-600"
                : "hover:bg-gray-100"
            }`}
          >
            {item.branchName}
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={closePopup}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            addToDataBase();
            closePopup();
          }}
          disabled={!selectedBranchId}
          className={`${
            selectedBranchId
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded w-full`}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

      <button
        onClick={controllPopup}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
      >
        Proceed to Checkout
      </button>
    </>
  );
}
