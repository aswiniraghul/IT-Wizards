//attach to item disoplay 
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { HOST_NAME } from '../env/config';

const FavouriteButton = ({ itemId, userId, favourites }) => {
    const [isFavourited, setIsFavourited] = useState();

    useEffect(() => {
        if (favourites.length) {
            setIsFavourited(favourites.some(fav => fav.id === itemId))
        }
    }, [favourites]);

    console.log(`item ID: ${itemId}, favourites: `, favourites);

    const toggleFavourite = async () => {
        try {
            const response = await axios.post(`${HOST_NAME}/api/favourites/${isFavourited ? 'remove' : 'add'}`, null, {
                params: {
                    userId,
                    itemId,
                }
            });
            if(response.status === 200) {
                setIsFavourited(!isFavourited);
            }
        } catch (error) {
            console.error('Unable to favourite item:', error);
        }
    }
    
    return (
        <button onClick= {toggleFavourite}>
            {isFavourited ? 'Unfavourite ' : 'Favourite '}
            <FontAwesomeIcon
                icon={
                    isFavourited
                    ? filledStar
                    : outlineStar
                }
            />
        </button>
    );
};

export default FavouriteButton;