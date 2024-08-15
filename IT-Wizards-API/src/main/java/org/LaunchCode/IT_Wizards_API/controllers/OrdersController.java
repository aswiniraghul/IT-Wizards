package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.OrdersRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
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

    @PostMapping("/{userId}")
    public Orders createOrder(@PathVariable Long userId, @RequestBody Orders newOrder) {
        newOrder.getUser().setId(userId);
        return  ordersService.createOrder(newOrder);
    }

    @GetMapping("/{userId}")
    public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
       return   ordersService.getOrdersByUserId(userId);
    }

    @GetMapping("/{userId}/{id}")
    public Orders getOrderById(@PathVariable Long userId, @PathVariable Long id) {
        return ordersService.getOrderById(userId, id);
    }

}
