package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.services.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/favourite")
public class FavouriteController {

    @Autowired
    private FavouriteService favouriteService;

    @PostMapping("/{itemId}")
    public void favoriteItem(@PathVariable Long itemId, @RequestParam Long userId) {
        favouriteService.toggleFavorite(itemId, userId);
    }
}