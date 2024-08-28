import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const OrderScreen = () => {
    const [orders,setOrders] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders(userId);
                setOrders(data);
            }catch (error) {
                console.error('Failed to fetch orders', error)
            }
        };
        if (userId) {
        fetchOrders();
        }
    }, [userId]);

  return (
    <section className="w-full border-b-4 border-black overflow-y-auto">
      <section className="bg-purple-400">
        <div className="container bg-purple-400 py-12 pb-36 px-12">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-5xl text-center font-bold underline mb-2">
              Your Orders
            </h2>
      {orders.length === 0 ? (
        <p>No orders.</p>
      ) : (
        <ul className="list-disc pl-5">
          {orders.map(order => (
            <li key={order.id} className="mb-4">
              <Link to={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                Order #{order.id} - ${order.total}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </section>
    </section>
  );
  
}

export default OrderScreen