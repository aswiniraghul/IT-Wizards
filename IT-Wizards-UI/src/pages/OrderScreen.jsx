import React, { useEffect, useState } from 'react'

const OrderScreen = () => {
    const [orders,setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders();
            }catch (error) {
                console.error('Failed to fetch orders', error)
            }
        };
        fetchOrders();
    }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
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
  );
  
}

export default OrderScreen