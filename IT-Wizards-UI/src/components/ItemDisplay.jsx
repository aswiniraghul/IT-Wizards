import { useEffect, useState, useContext } from 'react';
import { getItems, getItemCategoryList } from '../services/viewItemsService';
import cauldron from '../assets/images/cauldron.png';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import  ItemFilter from './Filter/ItemFilter';

const ItemDisplay = () => {
    const cart = useContext(CartContext);

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);

  const setSearchValue = event => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getItemCategoryList();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch category data', error);
    }
  };

  return (
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Shop</h2>
          <ItemFilter filters={categories} callbackFunc={setCategoryFilter} setValue={categoryFilter} />
          <div className="container m-auto max-w-5xl py-12">
            <div className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.filter(item => {
                  if(!categoryFilter || !categoryFilter.length) return true;
                  else if(item.itemCategory.name && categoryFilter.includes(item.itemCategory.name)) return true;
                  else return false;
                }).map((item) => {
                  if(searchTerm.trim() && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    console.log('should filter by ', searchTerm);
                    console.log('checking ', item.name);
                    return;
                  }
                  return (
                    <div className="mb-2 ml-2 mr-2" key={item.id}>
                      <Link to={`/items/${item.id}`}>
                        <img
                          src={cauldron}
                          className="size-80"
                        ></img>
                      </Link>

                      <div className="flex items-center justify-center">
                      {item.name}
                      </div>
                      <div className="flex items-center justify-center">
                        ${(Math.round(item.price * 100) / 100).toFixed(2)}
                      </div>
                      {item.itemCategory?.name && (
                        <div className="flex items-center justify-center">
                          <span className="item-category">{item.itemCategory.name}</span>
                        </div>
                      )}
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
                      {/* <p className="text-center">
                        <button
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-auto mt-6 hover:text-green-600 focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Add to Cart
                        </button>
                      </p> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDisplay;
