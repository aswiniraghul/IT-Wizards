package org.LaunchCode.IT_Wizards_API.exceptions;

public class OrderNotFoundException extends RuntimeException{
    public OrderNotFoundException(Long id) {super("Could not find the order with id " + id); }
}
