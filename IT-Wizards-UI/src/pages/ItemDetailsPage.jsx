import { useParams } from 'react-router-dom';
import { getItemDetails } from '../services/viewItemsService';
import { useEffect, useState } from 'react';
import cauldron from '../assets/images/cauldron.png';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState({
    name: '',
    description: '',
    // itemCategory: '',
    price: '',
  });
  const { name, description, price } = itemDetails;

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const data = await getItemDetails(id);
      setItemDetails(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">
            Item Details
          </h2>

          <div className="container m-auto max-w-5xl py-12 flex items-center justify-center">
            <table className="table-fixed border-separate border-spacing-6 m-auto border text-left border-purple-600">
              <div className="grid grid-cols-2 gap-6 ">
                <div classname="flex items-center justify-center">
                  <img
                    src={cauldron}
                    className="max-w-xs flex items-center justify-center"
                  ></img>
                </div>

                <div className="items-center  grid grid-flow-row auto-rows-min grid-cols-2 ">
                  <div
                    className="flex items-center  mr-1 font-bold text-3xl mb-10 mt-4"
                    value={name}
                  >
                    {itemDetails.name}
                  </div>
                  <div
                    className="flex items-center ml-1 font-bold text-xl mb-10 mt-4"
                    value={price}
                  >
                    ${(Math.round(itemDetails.price * 100) / 100).toFixed(2)}
                  </div>
                  <div>
                    <div className="flex items-center text-xl mb-4 font-bold">
                      Description:
                    </div>
                    <div
                      className="flex items-center mb-4 text-lg"
                      value={description}
                    >
                      {itemDetails.description}
                    </div>
                  </div>
                  <div></div>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full mt-6 hover:text-green-600 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsPage;
