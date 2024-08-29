
package org.LaunchCode.IT_Wizards_API.services;

import jakarta.transaction.Transactional;
import org.LaunchCode.IT_Wizards_API.exceptions.*;
import org.LaunchCode.IT_Wizards_API.models.*;
import org.LaunchCode.IT_Wizards_API.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrderItemsRepository orderItemsRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    @Autowired
    public OrdersService(OrdersRepository orderRepository, OrderItemsRepository orderItemsRepository,
                        CartRepository cartRepository, CartItemRepository cartItemRepository,
                         UserRepository userRepository, AddressRepository addressRepository) {
        this.ordersRepository = orderRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    public Orders createOrder(Long userId, Long addressId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException(userId));
        Address savedAddress = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException(addressId));

        Orders order = new Orders();
        order.setUser(user);
        order.setAddress(savedAddress);

        Orders savedOrder = ordersRepository.save(order);
        moveCartItemsToOrder(userId, savedOrder);

        return savedOrder;
    }

    public Orders findOrderById(Long orderId) {
        return ordersRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException(orderId));
    }

    public List<Orders> getUserOrders(Long userId) {
        return ordersRepository.findByUserId(userId);
    }

    public Orders getOrderForUser(Long orderId, Long userId) {
        return ordersRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new OrdersNotFoundException(orderId));
    }

    public void moveCartItemsToOrder(Long userId, Orders order) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(userId));
        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        order.getOrderItems().clear();
        double totalPrice = 0.0;
        int totalItems = 0;

        for (CartItem cartItem : cartItems) {
            Item item = cartItem.getItem();

            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(order);
            orderItem.setItem(item);
            orderItem.setItemName(item.getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getItem().getPrice());

            order.getOrderItems().add(orderItem);
            totalPrice += cartItem.getQuantity() * item.getPrice();
            totalItems += cartItem.getQuantity();
        }
        order.setTotalPrice(totalPrice);
        order.setNumberOfItems(totalItems);
        ordersRepository.save(order);
    }
}

