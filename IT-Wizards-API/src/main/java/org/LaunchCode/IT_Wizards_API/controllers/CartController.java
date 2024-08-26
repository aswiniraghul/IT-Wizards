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
import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping()
    public CartItem addItemToCart(@RequestBody Map<String, Long> requestBody) {
        Long userId = requestBody.get("userId");
        Long newItemId = requestBody.get("newItemId");

        if (userId == null || newItemId == null) {
            throw new IllegalArgumentException("userId and newItemId must be provided");
        }

        return cartService.addItemToCart(userId, newItemId);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @GetMapping("/{userId}/items")
    public List<CartItem> getAllCartItems(@PathVariable Long userId) {
        return cartService.getAllCartItems(userId);
    }


    @PutMapping("/{userId}/updateItem/{cartItemId}")
    public CartItem updateCartItemQuantity(@PathVariable Long userId, @PathVariable Long cartItemId, @RequestParam Integer quantity) {
        if (quantity == null || quantity < 1) {
            throw new IllegalArgumentException("Quantity must be a positive integer");
        }
        return cartService.updateCartItemQuantity(userId, cartItemId, quantity);
    }

    @DeleteMapping("/{userId}/removeItem/{cartItemId}")
    public void deleteCartItem(@PathVariable Long userId ,@PathVariable Long cartItemId) {
        cartService.deleteCartItem(userId, cartItemId);
    }


}
