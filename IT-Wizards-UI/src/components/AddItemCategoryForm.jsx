import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddItemCategoryForm = () => {
  const [itemCategory, setItemCategory] = useState();

  const onInputChange = (e) => {
      setItemCategory(e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
      await axios.post('http://localhost:8080/itemCategories', { name: itemCategory });
    return navigate('/itemCategories');
  };
  return (
    <section className="bg-purple-400">
      <div className="container m-auto max-w-3xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Add Item Category
            </h2>

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

            <div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full hover:text-green-600 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Item Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddItemCategoryForm;
