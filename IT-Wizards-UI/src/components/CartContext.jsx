import { createContext, useEffect, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import { useParams } from 'react-router-dom';

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
  const [item, setItemDetails] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems(id);
      setItemDetails(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  //[{id: 1, quantity: 2}, {id: 2, quantity:1}]

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

  function addOneToCart(item) {
    const quantity = getItemQuantity(item.id);

    if (quantity === 0) {
      //item is not yet in cart
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    } else {
      //item is in cart
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    }
    console.log('$' + JSON.stringify(cartItems));
  }

  function removeOneFromCart(item) {
    const quantity = getItemQuantity(item.id);

    if (quantity == 1) {
      deleteFromCart(item);
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : item
        )
      );
    }
  }

  function deleteFromCart(item) {
    setCartItems((cartItems) =>
      cartItems.filter((currentItem) => {
        return currentItem.id != item.id;
      })
    );
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
