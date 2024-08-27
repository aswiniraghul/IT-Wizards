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
        Cart cart;
        CartItem cartItem;
       try {
            cart = cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
       } catch(Exception e) {
           cart = cartRepository.save(new Cart(user));
        }
        Item item = itemRepository.findById(newItemId)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));
        //TODO: Look if cartItem exists & if so up quantity by 1
        try {
            cartItem = cartItemRepository.findByCartIdAndItemId(cart.getId(), item.getId() ).orElseThrow(() -> new CartItemNotFoundException(userId));
            cartItem.setQuantity(cartItem.getQuantity()+1);
        } catch(Exception e) {
             cartItem = new CartItem(1, cart, item);
        }

        return cartItemRepository.save(cartItem);
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
    }
    public List<CartItem> getAllCartItems(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
        return cart.getCartItems();
    }

//    public List<CartItem> getAllCartItems() {
//        return cartItemRepository.findAll();
//    }

//    public CartItem getCartItemById(Long id) {
//        return cartItemRepository.findById(id).orElseThrow(() -> new CartItemNotFoundException(id));
//    }

    public CartItem updateCartItemQuantity(Long userId, Long cartItemId, Integer newQuantity) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));

        if (!cartItem.getCart().equals(cart)) {
            throw new IllegalArgumentException("CartItem does not belong to the user");
        }

        cartItem.setQuantity(newQuantity);
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow(() -> new CartNotFoundException(userId));
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemNotFoundException(cartItemId));

        if (!cartItem.getCart().equals(cart)) {
            throw new IllegalArgumentException("CartItem does not belong to the user");
        }

        cartItemRepository.delete(cartItem);
    }

}
