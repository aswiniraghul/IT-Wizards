import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import Modal from './Modal';
import { CartContext, ItemDetails } from './CartContext';

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
                  Home
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
                <Modal open={open} onClose={() => setOpen(false)}>
                  <div className="text-left w-56">Your Cart:</div>
                  {cart.totalItemsInCart() > 0 ? (
                    <>
                      <p>Items in cart</p>
                      {cart.itemsHeldInCart.map((currentItem, index) => (
                        <h1 key={index}>{currentItem.name}</h1>
                      ))}
                      <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
                      <button>Checkout</button>
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
