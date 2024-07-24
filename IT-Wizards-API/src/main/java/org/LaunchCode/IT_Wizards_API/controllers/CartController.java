package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.repository.CartRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/newCart")
    Cart newCart(@RequestBody Cart newCart) {
        return cartRepository.save(newCart);
    }
    @GetMapping()
    List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @GetMapping("/cart/{id}")
    Cart getCartById(@PathVariable Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new CartNotFoundException(id));
    }

}
