package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.repository.CartItemRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItems")
public class CartItemController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @PostMapping("/newCartItems")
    CartItem newCartItem(@RequestBody CartItem newCartItem) {
        return cartItemRepository.save(newCartItem);
    }

    @GetMapping()
    List<CartItem> getAllOrders() {
        return cartItemRepository.findAll();
    }

    @GetMapping("/cartItems/{id}")
    CartItem getCartItemById(@PathVariable Long id) {
        return cartItemRepository.findById(id)
                .orElseThrow(() -> new CartItemNotFoundException(id));
    }
}
