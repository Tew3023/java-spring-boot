// components/PrintableContent.tsx
import React from "react";

interface PrintableContentProps {
  users: any[];
  foods: any[];
  orders: any[];
}

const PrintableContent = React.forwardRef<HTMLDivElement, PrintableContentProps>(
  ({ users, foods, orders }, ref) => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.orderPrice, 0);

    return (
      <div ref={ref} className="bg-gray-100 p-5 rounded-md min-h-screen">
        <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mb-4">
          Last updated: {new Date().toLocaleString()}
        </p>

        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl">{users.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Foods</h2>
            <p className="text-3xl">{foods.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl">{orders.length}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-3xl text-green-600">฿{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        
      </div>
    );
  }
);

export default PrintableContent;
