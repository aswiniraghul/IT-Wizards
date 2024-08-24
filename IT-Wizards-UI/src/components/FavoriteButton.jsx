//attach to item disoplay 
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { HOST_NAME } from '../env/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavouriteButton = ({ itemId, userId, favourites }) => {
    const [isFavourited, setIsFavourited] = useState();

    useEffect(() => {
        if (favourites.length) {
            setIsFavourited(favourites.some(fav => fav.id === itemId))
        }
    }, [favourites]);

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
            } else {
                console.log('response', response);
                toast.info(`Not setting favourite: ${response.status ? `status ${response.status} ${response.statusText}` : 'Unable to determine'}`);
            }
        } catch (error) {
            console.error('Unable to favourite item:', error);
            toast.error(`Unable to favourite item: ${error.response?.data?.message || error.message || 'API error'}`);
        }
    }
    
    return (
        <div className="flex items-center justify-center">
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
        </div>
    );
};

export default FavouriteButton;