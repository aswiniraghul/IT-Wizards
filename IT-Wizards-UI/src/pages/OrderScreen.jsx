import React, { useEffect, useState } from 'react'
import { getUserOrders } from '../services/orderService';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getUser } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';



const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userID, setUserId] = useState(null);

    const userName = localStorage.getItem('user');

    useEffect(() => {
        const fetchUser = async () => {
            if (userName === null) {
                return;
            }
            try {
                const data = await getUser(userName);
                setUserId(data.id);
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };
        fetchUser();
    }, [userName]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (userID === null) {
                return;
            }
            try {
                const data = await getUserOrders(userID);
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
                notifyFailedToFetchOrders();
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [userID]);

  return (
    <section className="w-full border-b-4 border-black overflow-y-auto">
      <section className="bg-purple-400">
        <div className="container bg-purple-400 py-12 pb-36 px-12">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-5xl text-center font-bold underline mb-2">
              Your Orders
            </h2>
            {loading ? (<LoadingSpinner loading={loading} />
            ) : (
                <div>
      {orders.length === 0 ? (
        <p>No orders.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of Items
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
                <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                            to={`/orders/${userID}/${order.id}`}
                            className="text-blue-600 hover:underline"
                        >
                            {order.id}
                        </Link>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                        {order.address}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                        ${order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {order.numberOfItems}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
      )}
      </div>
)}
</div>
</div>
</section>
</section>
);
};

export default OrderScreen