package org.LaunchCode.IT_Wizards_API.exceptions;

public class DuplicateItemException extends RuntimeException{
    public DuplicateItemException(String name) {super("An item with the name " + name + " already exists!");}
}
