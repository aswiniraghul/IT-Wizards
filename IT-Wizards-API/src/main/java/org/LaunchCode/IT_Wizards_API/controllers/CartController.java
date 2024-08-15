package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundAdvice;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.CartRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Cart;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("{userId}/items")
    public Cart addItemtToCart(@PathVariable Long userId, @RequestBody CartItem newItem) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart(user));
        cart.getCartItems().add(newItem);
        return cartRepository.save(cart);
    }

    @GetMapping("/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
    }
}
