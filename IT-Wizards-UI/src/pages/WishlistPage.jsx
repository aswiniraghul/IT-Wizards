import { useEffect, useState } from "react"
import { addItemToWishlist, getWishlist, removeItemFromWishlist } from "../services/wishlistService";
import { getItems } from "../services/viewItemsService";
import { Link } from "react-router-dom";
import cauldron from '../assets/images/cauldron.png';




const WishlistPage = ({userId}) => {
const [wishlist, setWishlist] = useState([]);
const [items, setItems] = useState([]);

useEffect(() => {
    fetchWishlist();
    fetchItems();
},[]);

const fetchWishlist = async () => {
    try {
        const data = await getWishlist(userId);
        setWishlist(data);
    }catch (error) {
        console.error('Error fetching wishlist', error);
    }
};

const fetchItems = async () => {
    try {
        const data = await getItems();
        setItems(data);
    }catch (error) {
        console.error('Error fetching items', error);
    }
};

const  addToWishlist= async (itemId) => {
    try {
        await addItemToWishlist(userId, itemId);
        fetchWishlist();
    } catch (error) {
        console.error('Error adding item from wishlist', error);
    }
};

const removeFromWishlist = async (itemId) => {
    try { 
        await removeItemFromWishlist(userId, itemId);
        fetchWishlist();
    } catch (error) {
        console.error('Error removing item from wishlist', error);
    }
};


  return (
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl pt-20 pb-64 flex items-center justify-center">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
                            </div>
                        </div>
                </div>
          </section>
  )
}

export default WishlistPage;