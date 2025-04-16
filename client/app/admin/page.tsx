// app/admin/page.tsx
import axios from "axios";

interface Users {
  id: number;
  email: string;
  password: string;
  role: string;
}

interface Foods {
  id: number;
  fname: string;
  price: number;
}

interface Orders {
  id: number;
  customer: string;
  foodOrder: string;
  quantity: number;
  orderPrice: number;
  createdAt: string;
  branch: string;
}

export default async function AdminPage() {
  let users: Users[] = [];
  let foods: Foods[] = [];
  let orders: Orders[] = [];

  try {
    const [usersRes, foodsRes, ordersRes] = await Promise.all([
      axios.get("http://localhost:8080/user"),
      axios.get("http://localhost:8080/food"),
      axios.get("http://localhost:8080/order"),
    ]);

    users = usersRes.data;
    foods = foodsRes.data;
    orders = ordersRes.data;
  } catch (err) {
    console.error("Error fetching data", err);
    return <div className="text-red-600 p-5">Failed to load dashboard data.</div>;
  }

  const ordersByBranch = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.branch] = (acc[order.branch] || 0) + 1;
    return acc;
  }, {});

  const revenueByBranch = orders.reduce<Record<string, number>>((acc, order) => {
    acc[order.branch] = (acc[order.branch] || 0) + order.orderPrice;
    return acc;
  }, {});

  const totalRevenue = orders.reduce((sum, order) => sum + order.orderPrice, 0);

  return (
    <div className="bg-gray-100 p-5 rounded-md min-h-screen">
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

      {/* Orders by Branch */}
      <div className="bg-white p-4 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Orders by Branch</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">Branch</th>
              <th className="p-2">Order Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ordersByBranch).map(([branch, count]) => (
              <tr key={branch} className="border-b">
                <td className="p-2">{branch}</td>
                <td className="p-2">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue by Branch */}
      <div className="bg-white p-4 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Revenue by Branch</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">Branch</th>
              <th className="p-2">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(revenueByBranch).map(([branch, revenue]) => (
              <tr key={branch} className="border-b">
                <td className="p-2">{branch}</td>
                <td className="p-2 text-green-600">฿{revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">Customer</th>
              <th className="p-2">Food</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Price</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.foodOrder}</td>
                <td className="p-2">{order.quantity}</td>
                <td className="p-2">฿{order.orderPrice.toLocaleString()}</td>
                <td className="p-2">{order.branch}</td>
                <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
