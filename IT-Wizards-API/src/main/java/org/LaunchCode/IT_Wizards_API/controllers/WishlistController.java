package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.models.Wishlist;
import org.LaunchCode.IT_Wizards_API.repository.WishlistRepository;
import org.LaunchCode.IT_Wizards_API.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlistByUserId(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    @PostMapping()
    public Wishlist addItemToWishlist(@RequestBody Map<String, Long> requestBody) {
        Long userId = requestBody.get("userId");
        Long itemId = requestBody.get("itemId");
        if (userId == null || itemId == null) {
            throw new IllegalArgumentException("userId and itemId must be provided");
        }
        return wishlistService.addItemToWishlist(userId, itemId);
    }

    @DeleteMapping("/{userId}/{itemId}")
    public void removeItemFromWishlist(@PathVariable Long userId, @PathVariable Long itemId) {

    }
}
