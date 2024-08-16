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
        console.log(itemId.id);
        await removeItemFromWishlist(itemId.id);
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
          {wishlist.map((item) => (
                <div key={item.item.id} className="mb-2 ml-2 mr-2 hover:scale-105">
                  <img src={cauldron} className="size-72" alt="Item"/>
                  <div className="flex items-center justify-center">
                    {item.item.name}
                  </div>
                  <div className="flex items-center justify-center">
                    ${(Math.round(item.item.price * 100) / 100).toFixed(2)}
                  </div>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full mt-3"
                    onClick={() => handleRemoveFromWishlist(item.item.id)}
                  >
                    Remove From Wishlist
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