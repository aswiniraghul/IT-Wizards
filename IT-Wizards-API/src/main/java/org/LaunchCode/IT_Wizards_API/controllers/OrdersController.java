package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.data.OrdersRepository;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping("/newOrder")
    Orders newOrder(@RequestBody Orders newOrder) {
        return ordersRepository.save(newOrder);
    }
    @GetMapping()
    List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
}
