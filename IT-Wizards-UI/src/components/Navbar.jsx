import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import Modal from './Modal';
import { CartContext } from './CartContext';
import PlaidLinkButton from './PlaidLinkButton';
import cauldron from '../assets/images/cauldron.png';
import profileImage from '../assets/images/profile.jpg';
import '../dropdown.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUsername = JSON.parse(localStorage.getItem('user'));
    const storedRole = JSON.parse(localStorage.getItem('userRole'));
    setUsername(storedUsername || '');
    setUserRole(storedRole || '');
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUsername('');
    setUserRole('');
    navigate('/');
    setDropdownOpen(false);
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:text-green-600 rounded-md px-3 py-2'
      : 'text-white hover:bg-black hover:text-green-600 rounded-md px-3 py-2';

  const handleDropdownClick = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-purple-800 border-b-4 border-black">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center pl-6 md:items-stretch">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-3xl font-bold hover:text-green-600">
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
                  <div className="text-3xl font-bold underline text-indigo-700">
                    Your Cart:
                  </div>
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
                                  className=" mx-2 align-bottom bg-green-500  text-slate-700 text-base font-bold rounded-full w-8 h-min"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => cart.removeOneFromCart(item)}
                                  className="size-20 mx-2 align-bottom bg-red-500 text-slate-700 text-base font-bold rounded-full w-8 h-min"
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
                <div className="relative">
                  <button
                    className="flex items-center text-white bg-gray-800 rounded-full px-4 py-2"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-full w-8 h-8"
                    />
                    <span className="ml-2">{username}</span>
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                      {!username ? (
                        <>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                              onClick={() => handleDropdownClick('/api/users/signin')}
                            >
                              Log In
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                              onClick={() => handleDropdownClick('/edit-profile')}
                            >
                              Edit Profile
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                              onClick={handleLogout}
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
