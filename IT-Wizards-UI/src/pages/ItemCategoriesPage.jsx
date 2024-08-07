import { getItemCategoryList } from '../services/viewItemsService';
import { useState, useEffect } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemCategoriesPage = () => {
  const [itemCategories, setItemCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchItemCategories();
  }, []);

  const fetchItemCategories = async () => {
    try {
      const data = await getItemCategoryList();
      setItemCategories(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const notifyCannotDel = () =>
    toast.warning('Item Category cannnot be deleted while there are associated items.');

  const deleteItemCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this item')) {
      try {
        await axios.delete(`http://localhost:8080/itemCategories/${id}`);
        fetchItemCategories();
      } catch (error) {
        console.log('error.response', error.response);
        notifyCannotDel();
      }
    }
  };

  return (
    <section className="bg-purple-400 pt-20 pb-96">
      <div className="container m-auto max-w-xl flex items-center justify-center">
        <div className="bg-white px-24 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="content-center text-3xl text-center font-semibold mb-2">
            Item Categories
          </h2>

          <div className="container content-center m-auto max-w-2xl py-12">
            <table className="table-fixed content-center border-separate border-spacing-6 border text-left border-purple-600">
              <thead>
                <tr className="text-green-600 content-center">
                  <th>Name</th>
                  <th>Edit Item</th>
                  <th>Delete Item</th>
                </tr>
              </thead>
              <tbody>
                {itemCategories.map((itemCategory) => {
                  return (
                    <tr key={itemCategory.id}>
                      <th>{itemCategory.name}</th>
                      <th>
                        <Link
                          to={`/itemCategories/${itemCategory.id}`}
                          className='editbutton h-6 px-3 text-sm text-white bg-cyan-400 rounded-md hover:bg-cyan-500 type="delete" value="delete"'
                        >
                          Edit
                        </Link>
                      </th>
                      <th>
                        <button
                          className='deletebutton h-6 px-3 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 type="delete" value="delete"'
                          onClick={() => deleteItemCategory(itemCategory.id)}
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
          <div className="flex items-center justify-center">
            <NavLink
              to="/AddItemCategories"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-auto hover:text-green-600 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add an Item Category
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemCategoriesPage;
