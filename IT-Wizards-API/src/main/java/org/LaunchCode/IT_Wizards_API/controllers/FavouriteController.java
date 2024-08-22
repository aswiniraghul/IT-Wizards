package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.services.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/favourites")
public class FavouriteController {

    @Autowired
    private FavouriteService favouriteService;

    @PostMapping("/add")
    public ResponseEntity<Void> addFavourite(@RequestParam Long userId, @RequestParam Long itemId) {
        favouriteService.addFavourite(userId, itemId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remove")
    public ResponseEntity<Void> removeFavourite(@RequestParam Long userId, @RequestParam Long itemId) {
        favouriteService.removeFavourite(userId, itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list")
    public ResponseEntity<Set<Item>> getFavourites(@RequestParam Long userId) {
        Set<Item> favourites = favouriteService.getFavourites(userId);
        return ResponseEntity.ok(favourites);
    }
}