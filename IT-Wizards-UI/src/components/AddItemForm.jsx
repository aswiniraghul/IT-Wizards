import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItemForm = () => {

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

  const navigate = useNavigate();

  const notifyCategoryAdded = () =>
    toast.success('Item Category added. You may now add this item.');

  const notifyDuplicateItem = () =>
    toast.warning(`An item with the name "${item.name}" already exists!`);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/items', item);
      return navigate('/items');
    } catch (error) {
      console.log('error.response', error.response);
      if (error.response) {
        if (error.response.status === 500 && error.response.data) {
          const responseErrors = error.response.data.message;
          if (responseErrors) {
            console.log(responseErrors);
            console.log(item.name);
          }
          if (
            responseErrors ==
            `An item with the name ${item.name} already exists!`
          ) {
            notifyDuplicateItem();
            return;
          } else if
            (responseErrors == `Could not find an item category with name ${item.itemCategory}`) {
            if (
              window.confirm(
                `Item Category does not exist. Create the Item Category first. Do you want to create the Item Category "${itemCategory}" now?`
              )
            ) {
              await axios.post('http://localhost:8080/itemCategories', {
                name: itemCategory,
              });
              notifyCategoryAdded();
              console.log('ItemCategory added');
            } else {
              console.log('ItemCategory not added');
            }
          }
        }
      }
    }
  };

  return (
    <section className="bg-purple-400">
      <div className="container m-auto max-w-3xl pt-20 pb-48">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Item
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Item Name
              </label>
              <input
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="The name of the item"
                required
                value={name}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="3"
                placeholder="A brief description of the item, any possible adverse side effects, etc."
                value={description}
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>

            <div className="mb-4">
              <label
                htmlFor="itemCategory"
                className="block text-gray-700 font-bold mb-2"
              >
                Item Category
              </label>
              <input
                id="itemCategory"
                name="itemCategory"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="A category for the item"
                required
                value={itemCategory}
                onChange={(e) => onInputChange(e)}
              ></input>
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
                placeholder="Enter a price"
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
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddItemForm;
