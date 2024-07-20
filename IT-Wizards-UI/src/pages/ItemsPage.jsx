import { useEffect, useState, useNavigate } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getItems } from '../services/viewItemsService';
import axios from 'axios';

const ItemsPage = () => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchItems();
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
    await axios.delete(`http://localhost:8080/items/${id}`);
    fetchItems();
  };

  return (
    <>
      <div className="container m-auto max-w-6xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Items</h2>

          <div className="container m-auto max-w-5xl py-12">
            <table className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
              <thead>
                <tr className="text-green-600">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Item Category</th>
                  <th>Price</th>
                  <th>Current Inventory</th>
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
                      <th>${item.price}</th>
                      <th>{item.currentInventory}</th>
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
        </div>
      </div>
    </>
  );
};

export default ItemsPage;
