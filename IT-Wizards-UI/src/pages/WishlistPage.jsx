import { useEffect, useState } from "react"
import { addItemToWishlist, getWishlist, removeItemFromWishlist } from "../services/wishlistService";
import { getItems } from "../services/viewItemsService";
import { Link } from "react-router-dom";
import cauldron from '../assets/images/cauldron.png';




const WishlistPage = () => {
const [wishlist, setWishlist] = useState([]);

useEffect(() => {
    fetchWishlist();
},[]);

const fetchWishlist = async () => {
    try {
        const data = await getWishlist();
        setWishlist(data);
    }catch (error) {
        console.error('Error fetching wishlist', error);
    }
};

const handleRemoveFromWishlist = async (itemId) => {
    try { 
        await removeItemFromWishlist(itemId);
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
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                     <div key={item.item.id} className="mb-6">
                     <h3 className="text-xl">{item.item.name}</h3>
                     <p>{item.item.description}</p>
                    <p>${(Math.round(item.item.price * 100) / 100).toFixed(2)}</p>
                    <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => handleRemoveFromWishlist(item.item.id)}
                    >Remove from Wishlist
                    </button>
                            </div>
                             ))}
                        </div>
                        </div>
                </div>
          </section>
  )
}

export default WishlistPage;