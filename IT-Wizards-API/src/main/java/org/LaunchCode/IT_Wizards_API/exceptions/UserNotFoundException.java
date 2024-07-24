package org.LaunchCode.IT_Wizards_API.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id) {
        super("Could not find the user with id " + id);
    }
}
