package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping()
    public ResponseEntity<Orders> createOrder(@RequestParam Long userId, @RequestParam Long addressId) {
        Orders createdOrder = ordersService.createOrder(userId, addressId);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
        return ordersService.getOrdersByUserId(userId);
    }

    @GetMapping("/{userId}/{id}")
    public Orders getOrderById(@PathVariable Long userId, @PathVariable Long id) {
        return ordersService.getOrderById(userId, id);
    }


}
