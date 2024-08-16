package org.LaunchCode.IT_Wizards_API.controllers;

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

    @GetMapping()
    public List<Wishlist> getWishlist() {
        return wishlistRepository.findAll();
    }

    @PostMapping()
    public Wishlist addItemToWishlist(@RequestBody Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    @DeleteMapping("/{itemId}")
    public void removeItemFromWishlist(@PathVariable Long itemId) {
        wishlistRepository.deleteByItemId(itemId);
    }

}
