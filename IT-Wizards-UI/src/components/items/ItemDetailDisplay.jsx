import { useParams } from 'react-router-dom';
import { getItemDetails } from '../../services/viewItemsService';
import { useEffect, useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../LoadingSpinner';

const ItemDetailsDisplay = (results) => {
  const cart = useContext(CartContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItemDetails] = useState({
    name: '',
    description: '',
    itemCategory: '',
    price: '',
    currentInventory: '',
  });
  const { name, description, itemCategory, price, currentInventory } = item;
  const itemQuantity = cart.getItemQuantity(item.id);

  const userName = localStorage.getItem('user');
  const userRole = localStorage.getItem('userRole');

  const imgBaseURL = 'http://localhost:8080/images/display';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl pt-16 pb-56">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">
            Item Details
          </h2>

          <div className="container m-auto max-w-5xl py-12 flex items-center justify-center">
            <div className="table-fixed border-separate border-4 border-spacing-6 m-auto text-left border-purple-600">
              <div>
                {loading ? (
                  <LoadingSpinner loading={loading} />
                ) : (
                  <div className="grid grid-cols-2 border gap-6 ">
                    <div className="flex items-center justify-center">
                      <img
                        height="250px"
                        width="250px"
                        src={`${imgBaseURL}?id=${item.imageID}`}
                        className="max-w-xs flex items-center justify-center"
                      ></img>
                    </div>

                    <div className="items-center grid grid-flow-row auto-rows-min grid-cols-2 ">
                      <div
                        className="flex items-center mr-1 font-bold text-3xl mb-4 mt-4"
                        value={name}
                      >
                        {item.name}
                      </div>
                      <div
                        className="flex items-center ml-1 font-bold text-xl mb-4 mt-4"
                        value={price}
                      >
                        ${(Math.round(item.price * 100) / 100).toFixed(2)}
                      </div>

                      <div className="container">
                        {item.currentInventory < 1 ? (
                          <div className="text-sm font-bold text-center mb-4 text-red-600">
                            Out of stock, check back soon!
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div />
                      <div>
                        <div className="flex items-center text-xl mb-4 font-bold">
                          Description:
                        </div>
                        <div
                          className="flex items-center mb-2 text-lg"
                          value={description}
                        >
                          {item.description}
                        </div>
                      </div>
                      <div></div>
                      {userName !== null && userRole !== 'admin' && (
                        <div>
                          {itemQuantity > 0 ? (
                            <>
                              <div className="flex bg-indigo-600  text-white text-xl font-bold py-2 px-4 rounded-full w-fit mt-6  focus:outline-none focus:shadow-outline">
                                In Cart: {itemQuantity}
                                <button
                                  onClick={() => {
                                    cart.addOneToCart(item);
                                  }}
                                  className="size-20 mx-2 align-bottom bg-green-500 text-slate-700 text-xl font-bold rounded-full w-8 h-min"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => {
                                    cart.removeOneFromCart(item);
                                  }}
                                  className="size-20 mx-2 align-bottom bg-red-500 text-slate-700 text-xl font-bold rounded-full w-8 h-min"
                                >
                                  -
                                </button>
                              </div>
                              <div></div>
                              <div>
                                <button
                                  className="flex bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 rounded-full w-fit mt-6 mb-6 focus:outline-none focus:shadow-outline"
                                  onClick={() => {
                                    cart.deleteFromCart(item);
                                  }}
                                >
                                  Remove all from cart
                                </button>
                              </div>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                cart.addOneToCart(item);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold mb-4 py-2 px-4 rounded-full w-full mt-6 hover:text-green-600 focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ItemDetailsDisplay;
