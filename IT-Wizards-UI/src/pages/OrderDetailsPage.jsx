import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderForUser } from '../services/orderService';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';


const OrderDetailScreen = () => {
    const [order, setOrder] = useState(null);
    const { userId, orderId } = useParams();
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const data = await getOrderForUser(userId, orderId);
                setOrder(data);
            } catch (error) {
                console.error('Failed to fetch order details', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId && orderId) {
            fetchOrderDetails();
        }
    }, [userId, orderId]);

    if (loading) {
        return <LoadingSpinner loading={loading} />;
    }

    return (
        <section className="w-full border-b-4 border-black overflow-y-auto">
            <section className="bg-purple-400">
                <div className="container bg-purple-400 py-12 pb-36 px-12">
                    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                        <h2 className="text-5xl text-center font-bold underline mb-2">
                            Order Details
                        </h2>
                            <div>
                                <p className="text-xl font-semibold mb-4">Order ID: {order.id}</p>
                                <p className="text-xl font-semibold mb-4">Total Price: ${order.totalPrice}</p>
                                <p className="text-xl font-semibold mb-4">Number of Items: {order.numberOfItems}</p>
                                <h3 className="text-2xl font-bold mb-4">Items:</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Item Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.orderItems.map(item => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    ${item.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default OrderDetailScreen;
