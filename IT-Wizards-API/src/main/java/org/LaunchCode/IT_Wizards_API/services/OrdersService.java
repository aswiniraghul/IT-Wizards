//package org.LaunchCode.IT_Wizards_API.services;
//
//import org.LaunchCode.IT_Wizards_API.exceptions.*;
//import org.LaunchCode.IT_Wizards_API.models.*;
//import org.LaunchCode.IT_Wizards_API.repository.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class OrdersService {
//
//    @Autowired
//    private OrdersRepository ordersRepository;
//
//    @Autowired
//    private CartRepository cartRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private AddressRepository addressRepository;
//
//    @Autowired
//    private CartItemRepository cartItemRepository;
//
//    public Orders createOrder (Orders newOrder) {
//        User user = userRepository.findById(newOrder.getUser().getId())
//                .orElseThrow(() ->new UserNotFoundException(newOrder.getUser().getId()));
//                newOrder.setUser(user);
//        Address address = addressRepository.findById(newOrder.getAddress().getId())
//                .orElseThrow(()-> new AddressNotFoundException(newOrder.getAddress().getId()));
//                newOrder.setAddress(address);
//        Cart userCart = cartRepository.findByUserId(user.getId())
//                .orElseThrow(()-> new CartNotFoundException(user.getId()));
//                newOrder.getCartItems().addAll(userCart.getCartItems());
//        return ordersRepository.save(newOrder);
//    }
//
//    public List<Orders> getOrdersByUserId(Long userId) {
//        return ordersRepository.findByUserId(userId);
//    }
//    public Orders getOrderById(Long userId, Long id) {
//        return ordersRepository.findByIdAndUserId(id, userId)
//                .orElseThrow(() -> new OrdersNotFoundException(id));
//    }
//
//    public CartItem addCartItemToUserCart(Long userId, CartItem newCartItem) {
//        Cart cart = cartRepository.findByUserId(userId)
//                .orElseGet(() -> {
//                    Cart newCart = new Cart();
//                    newCart.setUser(userRepository.findById(userId)
//                            .orElseThrow(() -> new UserNotFoundException(userId)));
//                    return cartRepository.save(newCart);
//                });
//
//        newCartItem.setCart(cart);
//        return cartItemRepository.save(newCartItem);
//    }
//    public List<CartItem> getAllCartItems() {
//        return cartItemRepository.findAll();
//    }
//
//    public CartItem getCartItemById(Long id) {
//        return cartItemRepository.findById(id)
//                .orElseThrow(() -> new CartItemNotFoundException(id));
//    }

//    public CartItem linkCartItemToOrder(Long cartItemId, Long orderId) {
//        Orders order = ordersRepository.findById(orderId)
//                .orElseThrow(() -> new OrdersNotFoundException(orderId));
//
//        CartItem cartItem = cartItemRepository.findById(cartItemId)
//                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));
//
//        cartItem.setOrder(order);
//        return cartItemRepository.save(cartItem);
//    }
//}
