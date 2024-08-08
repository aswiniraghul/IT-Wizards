package org.LaunchCode.IT_Wizards_API.exceptions;

public class ItemCategoryNotFoundException extends RuntimeException{
    public ItemCategoryNotFoundException(Long id){
        super("Could not find an item category with id " + id);
    }

    public ItemCategoryNotFoundException(String name){
        super("Could not find an item category with name " + name);
    }
}
