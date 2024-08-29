import { createContext, useEffect, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HOST_NAME } from '../env/config';
import { 
  addItemToCart,
  removeOneItemFromCart,
  deleteCartItem
} from '../services/cartService';


export const CartContext = createContext({
  itemsHeldInCart: [],
  totalItemsInCart: () => {},
  getItemQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  clearCart: () => {},
  returnAllItemsToInv: () => {},
});
export const ItemDetails = () => {
  const { id } = useParams(id);
  const [item, setItems] = useState([]);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems(id);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };
};

const cartFromLocalStorage = JSON.parse(
  localStorage.getItem('cartItems') || '[]'
);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const [itemDetails, setItemDetails] = useState({
    name: '',
    description: '',
    itemCategory: '',
    price: '',
    currentInventory: '',
  });
  
  const notifyLoginRequired = () => toast.error('Please login to add items to cart. Redirecting to log in page.')
  const notifyAdd = () => toast.success('Item added to cart');
  const notifyIncrease = () => toast.info('Increased amount in cart');
  const notifyDecrease = () => toast.info('Decreased amount in cart');
  const notifyRemoveAll = () => toast.info('Removed item from cart');
  const notifyOutOfStock = () =>
    toast.error('Insufficient inventory, item out of stock!');

  const removeItemFromInventory = async (item) => {
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    if (itemDetails.currentInventory > 0) {
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        currentInventory: itemDetails.currentInventory - 1,
      }));
      await axios.put(`${HOST_NAME}/items/editItem/${item.id}`, {
        ...itemDetails,
        currentInventory: itemDetails.currentInventory - 1,
      });
    } else {
      console.log('Insufficient Inventory');
      notifyOutOfStock();
    }
  };

  const addItemBackToInventory = async (item) => {
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    setItemDetails((prevItemDetails) => ({
      ...prevItemDetails,
      currentInventory: itemDetails.currentInventory + 1,
    }));
    await axios.put(`${HOST_NAME}/items/editItem/${item.id}`, {
      ...itemDetails,
      currentInventory: itemDetails.currentInventory + 1,
    });
    notifyDecrease();
  };

  const addAllBackToInventory = async (item) => {
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    setItemDetails((prevItemDetails) => ({
      ...prevItemDetails,
      currentInventory: itemDetails.currentInventory + getItemQuantity(item.id),
    }));
    await axios.put(`${HOST_NAME}/items/editItem/${item.id}`, {
      ...itemDetails,
      currentInventory: itemDetails.currentInventory + getItemQuantity(item.id),
    });
    notifyRemoveAll();
  };

  function totalItemsInCart() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems;
  }

  function getItemQuantity(id) {
    const quantity = cartItems.find((cartItem) => cartItem.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  const isLoggedIn = () => localStorage.getItem('user');
  const getUserId = () => localStorage.getItem('userId');
  async function addOneToCart(item) {
    if (!isLoggedIn()) {
      notifyLoginRequired();
      setTimeout(() => {
        window.location.href = '/api/users/signin'; 
      }, 4000);
      return;
    }

    const quantity = getItemQuantity(item.id);
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    if (itemDetails.currentInventory <= 0) {
      notifyOutOfStock();
      console.log('Insufficient Inventory');
      return;
    } else {
      await addItemToCart(getUserId(), item.id)

      if (quantity === 0) {
        //item is not yet in cart
        setCartItems([
          ...cartItems,
          {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            currentInventory: item.currentInventory,
            quantity: 1,
          },
        ]);
        removeItemFromInventory(item);
        notifyAdd();
      } else {
        //item is in cart
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
        removeItemFromInventory(item);
        notifyIncrease();
      }
    }
  }

  function removeOneFromCart(item) {
    const quantity = getItemQuantity(item.id);

    if (quantity == 1) {
       deleteFromCart(item);
    } else {
      removeOneItemFromCart(getUserId(), item.id);
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
      addItemBackToInventory(item);
    }
  }

  function deleteFromCart(item) {
    deleteCartItem(getUserId(), item.id);
    setCartItems((cartItems) =>
      cartItems.filter((currentItem) => {
        return currentItem.id != item.id;
      })
    );
    addAllBackToInventory(item);
  }

  function getTotalCost() {
    let totalCost = 0;
    cartItems.map((cartItem) => {
      totalCost += cartItem.price * cartItem.quantity;
    });
    return totalCost;
  }

  function clearCart() {
    setCartItems([]);
  }

  function returnAllItemsToInv() {
    cartItems.map((cartItem) => {
      deleteFromCart(cartItem);
    });
  }

  const contextValue = {
    itemsHeldInCart: cartItems,
    totalItemsInCart,
    getItemQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    clearCart,
    returnAllItemsToInv,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
