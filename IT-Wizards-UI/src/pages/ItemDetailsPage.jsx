import { useParams } from 'react-router-dom';
import { getItemDetails } from '../services/viewItemsService';
import { useEffect, useState, useContext } from 'react';
import cauldron from '../assets/images/cauldron.png';
import { CartContext } from '../components/CartContext';

const ItemDetailsPage = () => {
  const cart = useContext(CartContext);
  const { id } = useParams();
  const [item, setItemDetails] = useState({
    name: '',
    description: '',
    // itemCategory: '',
    price: '',
  });
  const { name, description, price } = item;
  const itemQuantity = cart.getItemQuantity(item.id);

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const data = await getItemDetails(id);
      console.log(`getItemDetails ${JSON.stringify(data)}`);
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
            <div className="table-fixed border-separate border-spacing-6 m-auto border text-left border-purple-600">
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
                    {item.name}
                  </div>
                  <div
                    className="flex items-center ml-1 font-bold text-xl mb-10 mt-4"
                    value={price}
                  >
                    ${(Math.round(item.price * 100) / 100).toFixed(2)}
                  </div>
                  <div>
                    <div className="flex items-center text-xl mb-4 font-bold">
                      Description:
                    </div>
                    <div
                      className="flex items-center mb-4 text-lg"
                      value={description}
                    >
                      {item.description}
                    </div>
                  </div>
                  <div></div>
                  {itemQuantity > 0 ? (
                    <>
                      <div className="flex bg-indigo-600  text-white text-xl font-bold py-2 px-4 rounded-full w-fit mt-6  focus:outline-none focus:shadow-outline">
                        In Cart: {itemQuantity}
                        <button
                          onClick={() => cart.addOneToCart(item)}
                          className="size-20 mx-2 align-bottom bg-green-500 text-slate-700 text-xl font-bold rounded-full w-8 h-min"
                        >
                          +
                        </button>
                        <button
                          onClick={() => cart.removeOneFromCart(item)}
                          className="size-20 mx-2 align-bottom bg-red-500 text-slate-700 text-xl font-bold rounded-full w-8 h-min"
                        >
                          -
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => cart.addOneToCart(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full mt-6 hover:text-green-600 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetailsPage;
