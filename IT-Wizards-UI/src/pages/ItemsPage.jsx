import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getItems } from '../services/viewItemsService';
import axios from 'axios';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchItems();
    const storedRole = JSON.parse(localStorage.getItem('userRole'));
    setUserRole(storedRole || '');
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item')) {
      await axios.delete(`http://localhost:8080/items/${id}`);
      fetchItems();
    } else {
      console.log(`Item ${id} was not deleted.`);
    }
  };

  return (
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl py-24 flex items-center justify-center">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Items</h2>

          <div className="container m-auto max-w-5xl py-12">
            <table className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
              <thead>
                <tr className="text-green-600">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Edit Item</th>
                  <th>Delete Item</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th>{item.name}</th>
                      <th>{item.description}</th>
                      <th>{item.itemCategory.name}</th>
                      <th>
                        ${(Math.round(item.price * 100) / 100).toFixed(2)}
                      </th>
                      <th className="flex items-center justify-center">
                        {item.currentInventory}
                      </th>
                      <th>
                        <Link
                          to={`editItem/${item.id}`}
                          className='editbutton h-6 px-3 text-sm text-white bg-cyan-400 rounded-md hover:bg-cyan-500 type="delete" value="delete"'
                        >
                          Edit
                        </Link>
                      </th>
                      <th>
                        <button
                          className='deletebutton h-6 px-3 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 type="delete" value="delete"'
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {userRole === 'admin' && (
          <div className="flex items-center justify-center">
            <NavLink
              to="/addItems"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-auto hover:text-green-600 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add an Item
            </NavLink>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemsPage;
