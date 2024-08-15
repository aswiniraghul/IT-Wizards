package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.repository.CartItemRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.CartItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.CartItem;
import org.LaunchCode.IT_Wizards_API.repository.OrdersRepository;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartItems")
public class CartItemController {

    @Autowired
     private OrdersService ordersService;

    @PostMapping("/{orderId}")
    public CartItem createCartItem(@PathVariable Long orderId, @RequestBody CartItem newCartItem) {
       return ordersService.addCartItemToOrder(orderId, newCartItem);
    }

    @GetMapping()
    public List<CartItem> getAllCartItems() {
       return ordersService.getAllCartItems(); // Assuming this method exists in OrdersService
    }

    @GetMapping("/{id}")
    public CartItem getCartItemById(@PathVariable Long id) {
       return ordersService.getCartItemById(id); // Assuming this method exists in OrdersService
    }

    @PutMapping("/{cartItemId}/order/{orderId}")
    public CartItem linkCartItemToOrder(@PathVariable Long cartItemId, @PathVariable Long orderId) {
        return ordersService.linkCartItemToOrder(cartItemId, orderId); // Assuming this method exists in OrdersService
    }

}
