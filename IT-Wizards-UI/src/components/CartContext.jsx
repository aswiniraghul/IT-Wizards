import { createContext, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import { useParams } from 'react-router-dom';

export const CartContext = createContext({
  itemsHeldInCart: [],
  getItemQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});
export const ItemDetails = () => {
  const { id } = useParams();
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
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  //[{id: 1, quantity: 2}, {id: 2, quantity:1}]

  function getItemQuantity(id) {
    cartItems.find((item) => item.id === id)?.quantity;
    undefined.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getItemQuantity(id);

    if (quantity === 0) {
      //item is not yet in cart
      setCartItems([
        ...cartItems,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      //item is in cart
      //[{id: 1, quantity:3}, { id:2, quantity 1+1}]
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getItemQuantity(id);

    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartItems((cartItems) =>
      cartItems.filter((currentItem) => {
        return currentItem.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartItems.map((cartItem) => {
      // const itemPrice = cartItem.price;
      totalCost += cartItem.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    itemsHeldInCart: [],
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
