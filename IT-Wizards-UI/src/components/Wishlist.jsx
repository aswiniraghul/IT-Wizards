import { useEffect, useState } from "react"

const Wishlist = ({ wishlist, addToWishlist, removeFromWishlist}) => {
const [itemToAdd, setItemToAdd] = useState("");

    const handleAddItem = () => {
        if (itemToAdd) {
            addToWishlist(itemToAdd);
            setItemToAdd("");
        }
    };

  return (
    <div>
        <h1>Wishlist</h1>
           


    </div>
  )
}

export default Wishlist