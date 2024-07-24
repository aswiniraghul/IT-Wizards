package org.LaunchCode.IT_Wizards_API.exceptions;

public class CartItemNotFoundException extends  RuntimeException{
    public CartItemNotFoundException(Long id) {
        super("Could not find the cart item with id " + id);
    }
}
