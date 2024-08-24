package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.LaunchCode.IT_Wizards_API.services.CartService;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItems")
public class CartItemController {

    @Autowired
    private CartService cartService;

    @GetMapping()
    public List<CartItem> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    @GetMapping("/{id}")
    public CartItem getCartItemById(@PathVariable Long id) {
        return cartService.getCartItemById(id);
    }

    @PutMapping("/{cartItemId}/order/{orderId}")
    public CartItem linkCartItemToOrder(@PathVariable Long cartItemId, @PathVariable Long orderId) {
        return cartService.linkCartItemToOrder(cartItemId, orderId);
    }
}
