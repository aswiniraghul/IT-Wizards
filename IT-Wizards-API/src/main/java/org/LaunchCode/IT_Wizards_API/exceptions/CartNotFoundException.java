package org.LaunchCode.IT_Wizards_API.exceptions;

public class CartNotFoundException extends RuntimeException{
    public CartNotFoundException(Long id) {
        super("Could not find the cart with id " + id);
    }
}
