package org.LaunchCode.IT_Wizards_API.exceptions;

public class WishlistNotFoundException extends RuntimeException{
    public WishlistNotFoundException(Long id) {
        super("Could not find the wishlist with id " + id);
    }
}
