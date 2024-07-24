package org.LaunchCode.IT_Wizards_API.exceptions;

public class OrdersNotFoundException extends RuntimeException{
    public OrdersNotFoundException(Long id) {
        super("Could not find the order with id " + id);
    }
}
