import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemCategoryList } from '../services/viewItemsService';

const EditItemForm = () => {
  const { id } = useParams();
  // const [itemCategoryList, setItemCategoryList] = useState([]);
  const [item, setItem] = useState({
    name: '',
    description: '',
    itemCategory: '',
    price: '',
    currentInventory: '',
  });
  const { name, description, itemCategory, price, currentInventory } = item;

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadItem();
  }, []);

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchItemCategoryList();
  // }, []);

  // const fetchItemCategoryList = async () => {
  //   try {
  //     const data = await getItemCategoryList();
  //     setItemCategoryList(data);
  //   } catch (error) {
  //     console.error('Failed to fetch data', error);
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(item);
    await axios.put(`http://localhost:8080/items/editItem/${id}`, item);
    return navigate('/items');
  };

  const loadItem = async () => {
    const result = await axios.get(`http://localhost:8080/items/${id}`);
    setItem(result.data);
  };

  return (
    <section className="bg-purple-400">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Item
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Item Name
              </label>
              <textarea
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="The name of the item"
                required
                value={name}
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="3"
                placeholder="A brief description of the item, any possible adverse side effects, etc."
                value={description}
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="itemCategory"
                className="block text-gray-700 font-bold mb-2"
              >
                Item Category
              </label>
              {/* <select
                id="itemCategory"
                name="itemCategory"
                className="border rounded
                w-full py-2 px-3"
                rows="1"
                placeholder="A category for the item"
                required
                value={itemCategory}
                defaultValue="default"
                onChange={(e) => onInputChange(e)}
              >
                <option value="default">Choose an option</option>
                {itemCategoryList.map((category) => {
                  return <option key={category.id}>{category.name}</option>;
                })}
              </select> */}
              <textarea
                id="itemCategory"
                name="itemCategory"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="A category for the item"
                required
                value={itemCategory.name}
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter a price (to the nearest penny)"
                required
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="currentInventory"
                className="block text-gray-700 font-bold mb-2"
              >
                Current Inventory
              </label>
              <input
                type="text"
                id="currentInventory"
                name="currentInventory"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter current inventory for the item"
                value={currentInventory}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full hover:text-green-600 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Edits
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditItemForm;
