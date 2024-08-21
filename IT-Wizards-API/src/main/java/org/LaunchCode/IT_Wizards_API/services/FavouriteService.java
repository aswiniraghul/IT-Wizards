package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.ItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Favourite;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.FavouriteRepository;
import org.LaunchCode.IT_Wizards_API.repository.ItemRepository;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class FavouriteService {

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Transactional
    public void toggleFavorite(Long itemId, Long userId) {
        // Check if already favourited
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new ItemNotFoundException(itemId));
        Favourite existingFavourite = favouriteRepository.findByItemIdAndUserId(itemId, userId);
            if (existingFavourite != null) {
                favouriteRepository.delete(existingFavourite);
            } else {
                Favourite favourite = new Favourite();
                favourite.getItems().add(item);
                favourite.getUsers().add(user);
//                favourite.setItems((Set<Item>) item);
//                favourite.setItemId(itemId);
//                favourite.setUserId(userId);
                favouriteRepository.save(favourite);

                // Optionally, update the user and item entities
//                user.getFavourites().add(favourite);
//                item.getUsersWhoFavourited().add(favourite);
//
//                userRepository.save(user);
//                itemRepository.save(item);
            }
    }
}
