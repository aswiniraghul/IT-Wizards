package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.repository.OrdersRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private OrdersRepository ordersRepository;

    @PostMapping()
    Orders newOrder(@RequestBody Orders newOrder) {
        return ordersRepository.save(newOrder);
    }

    @GetMapping("/{userId}")
    public List<Orders> getOrdersByUserId(@PathVariable Long userId) {
        return ordersRepository.findByUserId(userId);
    }

    @GetMapping("/{userId}/{id}")
    public Orders getOrderById(@PathVariable Long userId, @PathVariable Long id) {
        return ordersRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new OrdersNotFoundException(id));
    }

}
