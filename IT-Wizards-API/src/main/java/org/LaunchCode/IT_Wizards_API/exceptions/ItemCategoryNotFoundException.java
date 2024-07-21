package org.LaunchCode.IT_Wizards_API.exceptions;

public class ItemCategoryNotFoundException extends RuntimeException{
    public ItemCategoryNotFoundException(Long id){
        super("Could not find an item with id " + id);
    }
}
