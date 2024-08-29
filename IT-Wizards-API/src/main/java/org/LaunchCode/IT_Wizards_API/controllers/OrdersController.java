package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.AddressNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.CartItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Address;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    private final OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Orders> createOrder(@PathVariable Long userId, @RequestBody Address address) {
        try {

            Orders order = ordersService.createOrder(userId, address);

            ordersService.moveCartItemsToOrder(userId, order);

            return ResponseEntity.ok(order);
        } catch (UserNotFoundException | AddressNotFoundException | CartNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (CartItemNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Orders>> getUserOrders(@PathVariable Long userId) {
        List<Orders> orders = ordersService.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{userId}/{orderId}")
    public ResponseEntity<Orders> getOrderForUser(@PathVariable Long userId, @PathVariable Long orderId) {
        Orders order = ordersService.getOrderForUser(orderId, userId);
        return ResponseEntity.ok(order);
    }

}
