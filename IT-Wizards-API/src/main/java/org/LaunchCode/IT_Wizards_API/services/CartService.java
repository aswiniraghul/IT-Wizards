package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.exceptions.CartItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.CartNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.OrdersNotFoundException;
import org.LaunchCode.IT_Wizards_API.exceptions.UserNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.*;
import org.LaunchCode.IT_Wizards_API.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    public CartItem addItemToCart(Long userId, Long newItemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));

        Item item = itemRepository.findById(newItemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        CartItem cartItem = new CartItem(1, cart, item);
        return cartItemRepository.save(cartItem);
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public CartItem getCartItemById(Long id) {
        return cartItemRepository.findById(id).orElseThrow(() -> new CartItemNotFoundException(id));
    }

    public CartItem updateCartItemQuantity(Long cartItemId, Integer newQuantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));
        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));
        cartItemRepository.delete(cartItem);
    }

}
