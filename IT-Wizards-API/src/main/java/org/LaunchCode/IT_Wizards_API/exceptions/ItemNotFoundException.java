package org.LaunchCode.IT_Wizards_API.exceptions;

public class ItemNotFoundException extends RuntimeException{
    public ItemNotFoundException(Long id){
        super("Could not find an item with id " + id);
    }
}
