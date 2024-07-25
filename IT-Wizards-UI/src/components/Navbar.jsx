import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import Modal from './Modal';
import { CartContext } from './CartContext';
import PlaidLinkButton from './PlaidLinkButton';
import cauldron from '../assets/images/cauldron.png';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const cart = useContext(CartContext);

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:text-green-600 rounded-md px-3 py-2'
      : 'text-white hover:bg-black hover:text-green-600 rounded-md px-3 py-2';
  return (
    <nav className="bg-purple-800 border-b border-purple-950-400">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2  hover:text-green-600">
                B.R.E.W.S.
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkClass}>
                  Shop
                </NavLink>
                <NavLink to="/items" className={linkClass}>
                  Items
                </NavLink>
                <NavLink to="/itemCategories" className={linkClass}>
                  Item Categories
                </NavLink>
                <button
                  className="hidden md:block rounded-md text-white text-2xl font-bold ml-2 hover:text-green-600 hover:bg-black"
                  onClick={() => setOpen(true)}
                >
                  <ShoppingCart width={40} />
                </button>
                <div className="text-green-600 font-bold text-sm">
                  {cart.totalItemsInCart()}
                </div>
                <Modal
                  className="grid grid-cols-2 gap-6"
                  open={open}
                  onClose={() => setOpen(false)}
                >
                  <div className="text-3xl font-bold underline text-indigo-700">Your Cart:</div>
                  {cart.totalItemsInCart() > 0 ? (
                    <>
                      <div className="">
                        <div className="grid grid-flow-row auto-rows-min grid-cols-2 text-indigo-700">
                          {cart.itemsHeldInCart.map((item, index) => (
                            <>
                              <div>
                                <img
                                  className="items-center justify-center "
                                  src={cauldron}
                                />
                              </div>
                              <div className="items-center justify-center mb-10 mt-10">
                                <h1
                                  className="text-xl underline font-extrabold"
                                  key={index}
                                >
                                  {item.name}
                                </h1>
                                <h2
                                  className="text-base font-semibold mt-2 mb-3"
                                  key={index}
                                >
                                  {item.quantity} in cart
                                </h2>
                                <button
                                  onClick={() => cart.addOneToCart(item)}
                                  className=" mx-2 align-bottom bg-green-500 text-slate-700 text-base font-bold rounded-full w-8 h-min"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => cart.removeOneFromCart(item)}
                                  className="size-20 mx-2 align-bottom bg-red-500  text-slate-700 text-base font-bold rounded-full w-8 h-min"
                                >
                                  -
                                </button>
                                <button
                                  className="flex bg-red-600 hover:bg-red-700 text-white text-base font-bold py-2 px-4 rounded-full w-auto mt-2 mb-2 focus:outline-none focus:shadow-outline"
                                  onClick={() => cart.deleteFromCart(item)}
                                >
                                  Remove all from cart
                                </button>
                              </div>
                            </>
                          ))}
                        </div>

                        <h1 className="text-xl text-green-700 text-center border-8 border-indigo-500 mt-6 mb-6 font-extrabold">
                          Total: ${cart.getTotalCost().toFixed(2)}
                        </h1>
                        <button className="flex bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold py-2 px-4 rounded-full w-auto mt-2 mb-2 focus:outline-none focus:shadow-outline">
                          Checkout
                        </button>
                        <PlaidLinkButton />
                      </div>
                    </>
                  ) : (
                    <h1>Your cart is empty!</h1>
                  )}
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
