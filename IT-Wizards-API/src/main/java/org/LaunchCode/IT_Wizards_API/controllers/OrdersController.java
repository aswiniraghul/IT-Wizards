package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping()
    public Orders createOrder(@RequestBody Orders newOrder) {
        return ordersService.createOrder(
                newOrder.getUser().getId(),
                newOrder.getAddress().getId(),
                newOrder.getAddress().getAddress(),
                newOrder.getAddress().getCity(),
                newOrder.getAddress().getState(),
                newOrder.getAddress().getZipcode()
        );
    }

    @GetMapping("/{userId}")
    public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
        return ordersService.getOrdersByUserId(userId);
    }

    @GetMapping("/{userId}/{orderId}")
    public Orders getOrderByIdAndUserId(@PathVariable Long userId, @PathVariable Long orderId) {
        return ordersService.getOrderByIdAndUserId(userId, orderId).orElseThrow(()-> new OrdersNotFoundException(orderId));
    }

}
