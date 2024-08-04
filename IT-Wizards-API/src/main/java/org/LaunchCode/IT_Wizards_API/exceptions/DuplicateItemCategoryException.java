package org.LaunchCode.IT_Wizards_API.exceptions;

public class DuplicateItemCategoryException extends RuntimeException{
    public DuplicateItemCategoryException(String name) {super("An item category with the name " + name + " already exists!");}

}
