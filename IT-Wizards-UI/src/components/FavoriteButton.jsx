//attach to item disoplay 
import { useEffect, useState } from 'react';
import { getUser } from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { HOST_NAME } from '../env/config';

const FavouriteButton = ({ itemId }) => {
    const [isFavourited, setIsFavourited] = useState(false);
    const [userId, setUserId] = useState(null);
    const userName = localStorage.getItem('user');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (userName === null) {
            return
        } else {
            try {
                const data = await getUser(userName);
                console.log(data.id);
                setUserId(data.id);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        }
    };

    const toggleFavourite = async () => {
        try {
            const response = await axios.post (`${HOST_NAME}/favourite/${itemId}`, null, {
                params: {
                    userId: userId
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