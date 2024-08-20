package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.*;
import org.LaunchCode.IT_Wizards_API.models.*;
import org.LaunchCode.IT_Wizards_API.repository.AddressRepository;
import org.LaunchCode.IT_Wizards_API.repository.CartRepository;
import org.LaunchCode.IT_Wizards_API.repository.OrdersRepository;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private AddressRepository addressRepository;

    public List<Orders> getOrdersByUserId(Long userId) {
        return ordersRepository.findByUserId(userId);
    }
    public Optional<Orders> getOrderByIdAndUserId(Long userId, Long orderId) {
        return ordersRepository.findOrderByIdAndUserId(userId, orderId);
    }

    public Orders createOrder(Long userId, Long addressId, String addressLine, String city, String state, Integer zipcode) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException(userId));
        Address address = addressRepository.findById(addressId).orElse(null);

        if (address == null) {
            address = new Address();
            address.setAddress(addressLine);
            address.setCity(city);
            address.setState(state);
            address.setZipcode(zipcode);
            address = addressRepository.save(address);
        }
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(()-> new CartNotFoundException(userId));

        Orders order = new Orders();
        order.setUser(user);
        order.setAddress(address);
        order.setCart(cart);
        return ordersRepository.save(order);
    }

}
