import React, { useState, useEffect } from 'react'
import { getUser } from '../services/userService';
import { getOrders } from '../services/ordersService';

const OrdersPage = () => {
    const[orders, setOrders] = useState([]);
    const[userId, setUserId] = useState(null);

    const userName = localStorage.getItem('user');

    useEffect(() => {
        fetchUser();
      }, []);
    
      useEffect(() => {
        if (userId !== null) {
          fetchOrders();
        }
      }, [userId])
    
      const fetchUser = async () => {
        if (userName === null) {
          return
        } else {
          try {
            const data = await getUser(userName);
            console.log(data.id);
            setUserId(data.id);
          } catch (error) {
            console.error('Failed to fetch data', error);
          }
        }
      };
    
      const fetchOrders = async () => {
        try {
          const data = await getOrders(userId);
          console.log(data);
          setOrders(data);
        } catch (error) {
          console.error('Error fetching wishlist', error);
        }
      };


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
)
};

export default OrdersPage