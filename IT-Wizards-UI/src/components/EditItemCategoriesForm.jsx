import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemCategory } from '../services/viewItemsService';
import axios from 'axios';

const EditItemCategoriesForm = () => {
  const { id } = useParams();

  const [itemCategory, setItemCategory] = useState({
    name: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchItemCategory();
  }, []);

  const { name } = itemCategory;

  const onInputChange = (e) => {
    setItemCategory({ ...itemCategory, [e.target.name]: e.target.value });
  };
  const fetchItemCategory = async () => {
    try {
      const data = await getItemCategory(id);
      setItemCategory(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(itemCategory);
    await axios.put(`http://localhost:8080/itemCategories/${id}`, itemCategory);
    return navigate('/itemCategories');
  };
  return (
    <section className="bg-purple-400">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Item Category
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Item Category Name
              </label>
              <textarea
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3"
                rows="1"
                placeholder="The name of the item category"
                required
                value={name}
                onChange={(e) => onInputChange(e)}
              ></textarea>
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

export default EditItemCategoriesForm;
