package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.repository.CartItemRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItems")
public class CartItemController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/addToCart/{userId}")
    public CartItem addItemToCart(@PathVariable Long userId, @RequestBody CartItem newCartItem) {
        return ordersService.addCartItemToUserCart(userId, newCartItem);
    }

    @GetMapping()
    public List<CartItem> getAllCartItems() {
        return ordersService.getAllCartItems();
    }

    @GetMapping("/{id}")
    public CartItem getCartItemById(@PathVariable Long id) {
        return ordersService.getCartItemById(id);
    }

}

