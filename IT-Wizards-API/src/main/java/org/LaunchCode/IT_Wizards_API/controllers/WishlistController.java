package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.WishlistNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Wishlist;
import org.LaunchCode.IT_Wizards_API.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @PostMapping("/newWishlist")
    Wishlist newWishlist(@RequestBody Wishlist newWishlist) {
        return wishlistRepository.save(newWishlist);
    }
    @GetMapping()
    List<Wishlist> getAllWishlists() {
        return wishlistRepository.findAll();
    }

    @GetMapping("/wishlist/{id}")
    Wishlist getWishlistById(@PathVariable Long id) {
        return wishlistRepository.findById(id)
                .orElseThrow(() -> new WishlistNotFoundException(id));
    }
}
