package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundAdvice;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.CartRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Cart;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.LaunchCode.IT_Wizards_API.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping()
    public CartItem addItemToCart(@RequestParam Long userId, @RequestParam Long newItemId) {
        if (userId == null || newItemId == null) {
            throw new IllegalArgumentException("userId and newItemId must be provided");
        }
        return cartService.addItemToCart(userId, newItemId);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

}
