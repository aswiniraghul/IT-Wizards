import { createContext, useEffect, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HOST_NAME } from '../env/config';

export const CartContext = createContext({
  itemsHeldInCart: [],
  totalItemsInCart: (id) => {},
  getItemQuantity: (id) => {},
  addOneToCart: (item) => {},
  removeOneFromCart: (item) => {},
  deleteFromCart: (item) => {},
  getTotalCost: (id) => {},
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

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [itemDetails, setItemDetails] = useState({
    name: '',
    description: '',
    itemCategory: '',
    price: '',
    currentInventory: '',
  });

  const notifyAdd = () => toast.success('Item added to cart');
  const notifyRemove = () => toast.info('Decreased amount in cart');
  const notifyRemoveAll = () => toast.info('Removed item from cart');
  const notifyOutOfStock = () => toast.warning('Insufficient inventory, item out of stock!');


  const removeItemFromInventory = async (item) => {
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    if (itemDetails.currentInventory <= 0) {
      notifyOutOfStock();
      console.log('Insufficient Inventory');
      return;
    } else {
      setItemDetails((prevItemDetails) => ({
        ...prevItemDetails,
        currentInventory: itemDetails.currentInventory - 1,
      }));
      await axios.put(`${HOST_NAME}/items/editItem/${item.id}`, {
        ...itemDetails,
        currentInventory: itemDetails.currentInventory - 1,
      });
      notifyAdd();
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
    notifyRemove();
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
    console.log(quantity);

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  async function addOneToCart(item) {
    const quantity = getItemQuantity(item.id);
    const response = await axios.get(`${HOST_NAME}/items/${item.id}`);
    const itemDetails = response.data;
    if (itemDetails.currentInventory <= 0) {
      console.log('Insufficient Inventory');
      return;
    } else {
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
      }
      console.log('$' + JSON.stringify(cartItems));
    }
  }

  function removeOneFromCart(item) {
    const quantity = getItemQuantity(item.id);

    if (quantity == 1) {
      deleteFromCart(item);
    } else {
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

  const contextValue = {
    itemsHeldInCart: cartItems,
    totalItemsInCart,
    getItemQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
