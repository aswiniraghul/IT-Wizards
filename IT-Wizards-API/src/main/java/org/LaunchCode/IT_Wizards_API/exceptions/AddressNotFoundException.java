package org.LaunchCode.IT_Wizards_API.exceptions;

public class AddressNotFoundException extends RuntimeException{
    public AddressNotFoundException(Long id) {
        super("Could not find address with id " + id);
    }
}
