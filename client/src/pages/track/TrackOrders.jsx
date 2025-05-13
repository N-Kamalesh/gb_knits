import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TrackOrders.css";

const { VITE_API_URL } = import.meta.env;

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchOrders(token);
    } else {
      setLoading(false);
      navigate("/login");
    }
  }, []);

  const fetchOrders = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${VITE_API_URL}/order/user`, config);
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch orders" + error.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="mt-24 min-h-screen bg-gray-900 text-white lg:mt-[4.5rem]">
      <div className="container mx-auto px-4 py-6">
        <h2 className="mb-6 text-center text-3xl font-bold text-sky-300">
          Your Orders
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-sky-400"></div>
          </div>
        ) : error ? (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
            You have no orders yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order._id} className="animated-card bg-black-glass">
                <div className="relative z-10 space-y-3 p-5">
                  <h3 className="text-xl font-semibold text-sky-300">
                    Order #{order._id.slice(0, 8)}
                  </h3>
                  <p className="text-gray-400">
                    Placed on: {formatDate(order.createdAt)}
                  </p>

                  <div className="space-y-1 border-t border-white/10 pt-3">
                    <p className="text-sm text-gray-300">
                      Customer: {order.name}
                    </p>
                    <p className="text-sm text-gray-300">
                      Address: {order.address}
                    </p>
                    <p className="text-sm text-gray-300">
                      Machine: {order.machineType}
                    </p>
                    <p className="text-sm text-gray-300">
                      Brand: {order.brand}
                    </p>
                    <p className="text-sm text-gray-300">
                      Fabric: {order.fabric}
                    </p>
                    <p className="text-sm text-gray-300">
                      Color: {order.color}
                    </p>
                    <p className="text-sm text-gray-300">
                      Diameter: {order.diameter}
                    </p>
                    <p className="text-sm text-gray-300">
                      Quantity: {order.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="rounded-full bg-green-600 px-2 py-1 text-xs">
                      Paid
                    </span>
                    <span className="text-lg font-bold text-green-400">
                      Rs.{order.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
