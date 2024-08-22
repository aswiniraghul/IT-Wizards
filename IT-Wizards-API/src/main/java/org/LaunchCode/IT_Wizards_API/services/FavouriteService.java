package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.ItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.ItemRepository;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class FavouriteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void addFavourite(Long userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new ItemNotFoundException(itemId));

        user.getFavourites().add(item);
        userRepository.save(user);
    }

    public void removeFavourite(Long userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new ItemNotFoundException(itemId));

        user.getFavourites().remove(item);
        userRepository.save(user);
    }

    public Set<Item> getFavourites(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        return user.getFavourites();
    }
}
