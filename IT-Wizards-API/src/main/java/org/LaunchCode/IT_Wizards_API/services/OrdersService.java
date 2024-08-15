package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Cart;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.repository.CartRepository;
import org.LaunchCode.IT_Wizards_API.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartRepository cartRepository;

    public Orders createOrder (Orders newOrder) {
        Cart userCart = cartRepository.findByUserId(newOrder.getUser().getId())
                .orElseThrow(() -> new CartNotFoundException(newOrder.getUser().getId()));
        newOrder.getCartItems().addAll(userCart.getCartItems());
        return ordersRepository.save(newOrder);
    }

    public List<Orders> getOrdersByUserId(Long userId) {
        return ordersRepository.findByUserId(userId);
    }
    public Orders getOrderById(Long userId, Long id) {
        return ordersRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new OrdersNotFoundException(id));
    }
}
