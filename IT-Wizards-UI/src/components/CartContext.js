import { createContext, useState } from 'react';
import { getItems } from '../services/viewItemsService';

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});
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

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  //[{id: 1, quantity: 2}, {id: 2, quantity:1}]

  function getProductQuantity(id) {
    cartProducts.find((product) => product.id === id)?.quantity;
    undefined.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      //product is not yet in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      //product is in cart
      //[{id: 1, quantity:3}, { id:2, quantity 1+1}]
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }
    
    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            // const productPrice = cartItem.price;
            totalCost += (cartItem.price * cartItem.quantity);
        });
        return totalCost;
  }

  const contextValue = {
    items: [],
    getProductQuantity,
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

// Context (cart, addToCart, removeFromCart)
// Provider -> gives React app access to all the things in context
