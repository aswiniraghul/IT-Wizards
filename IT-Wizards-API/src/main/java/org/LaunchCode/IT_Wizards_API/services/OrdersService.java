package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.*;
import org.LaunchCode.IT_Wizards_API.models.*;
import org.LaunchCode.IT_Wizards_API.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Orders createOrder(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        Cart userCart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CartNotFoundException(user.getId()));

        if (userCart.getCartItems().isEmpty()) {
            throw new IllegalStateException("Cannot place an order with an empty cart");
        }

        Orders newOrder = new Orders();
        newOrder.setUser(user);
        newOrder.setCart(userCart);

        Orders savedOrder = ordersRepository.save(newOrder);
        cartRepository.save(userCart);

        return savedOrder;
    }


    public List<Orders> getOrdersByUserId(Long userId) {
        return ordersRepository.findByUserId(userId);
    }
    public Orders getOrderById(Long userId, Long id) {
        return ordersRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new OrdersNotFoundException(id));
    }

    public CartItem addCartItemToUserCart(Long userId, CartItem newCartItem) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(userRepository.findById(userId)
                            .orElseThrow(() -> new UserNotFoundException(userId)));
                    return cartRepository.save(newCart);
                });

        newCartItem.setCart(cart);
        return cartItemRepository.save(newCartItem);
    }
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem getCartItemById(Long id) {
        return cartItemRepository.findById(id)
                .orElseThrow(() -> new CartItemNotFoundException(id));
    }
}

