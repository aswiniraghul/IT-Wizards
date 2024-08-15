package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.AddressNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.hibernate.query.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping()
    public ResponseEntity<Orders> createOrder(@RequestBody Orders newOrder) {
        Orders createdOrder = ordersService.createOrder(newOrder);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping()
        public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
        return ordersService.getOrdersByUserId(userId);
}

    @GetMapping("/{id}")
    public Orders getOrderById(@PathVariable Long userId, @PathVariable Long id) {
        return ordersService.getOrderById(userId, id);
    }
}
