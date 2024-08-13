import { useEffect, useState, useContext } from 'react';
import { getItems } from '../services/viewItemsService';
import cauldron from '../assets/images/cauldron.png';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const ItemDisplay = ({ searchTerm }) => {
  const cart = useContext(CartContext);
  const [items, setItems] = useState([]);

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

  const itemsArr = [];

  return (
    <section className="w-full border-b-4 border-black overflow-y-auto">
      <section className="bg-purple-400">
        <div className="container bg-purple-400 py-12 pb-36 px-12">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-5xl text-center font-bold underline mb-2">
              Welcome to the Shop
            </h2>

            <div className="container m-auto max-w-5xl py-12">
              <div className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
                <div className="grid grid-cols-1 mb-8 md:grid-cols-3 gap-6">
                  {items.map((item) => {
                    if (
                      searchTerm.trim() &&
                      !item.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return;
                    } else {
                      itemsArr.push(item);
                    }

                    return (
                      <div key={item.id}>
                        <div className="mb-2 ml-2 mr-2 hover:scale-105">
                          <Link to={`/items/${item.id}`}>
                            <img src={cauldron} className="size-72"></img>
                          </Link>

                          <div className="flex items-center justify-center">
                            {item.name}
                          </div>
                          <div className="flex items-center justify-center">
                            ${(Math.round(item.price * 100) / 100).toFixed(2)}
                          </div>

                          {cart.getItemQuantity(item.id) > 0 ? (
                            <div className="">
                              <div className="flex bg-indigo-600  text-white text-sm font-bold py-2 px-4 ml-3 mr-3 rounded-full w-fit  mt-5  focus:outline-none focus:shadow-outline">
                                In Cart: {cart.getItemQuantity(item.id)}
                                <button
                                  onClick={() => cart.addOneToCart(item)}
                                  className=" mx-2 align-bottom bg-green-500 text-slate-700 text-sm font-bold rounded-full w-8 h-min"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => cart.removeOneFromCart(item)}
                                  className="size-20 mx-2 align-bottom bg-red-500  text-slate-700 text-sm font-bold rounded-full w-8 h-min"
                                >
                                  -
                                </button>
                              </div>
                              <div></div>
                              <div>
                                <button
                                  className="flex bg-red-600 hover:bg-red-700 ml-3 mr-3  text-white text-sm font-bold py-2 px-4 rounded-full w-fit mt-3 mb-3 focus:outline-none focus:shadow-outline"
                                  onClick={() => cart.deleteFromCart(item)}
                                >
                                  Remove all from cart
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => cart.addOneToCart(item)}
                              className="bg-indigo-600 hover:bg-indigo-700   text-white font-bold py-2 px-4 rounded-full w-full mt-6 hover:text-green-600 focus:outline-none focus:shadow-outline"
                              type="submit"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {itemsArr.length === 0 && (
                    <>
                      <div></div>
                      <div className="flex-col text-2xl font-bold mt-6 text-green-500 text-center">
                        No items with the given search. Try a new search!
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ItemDisplay;
