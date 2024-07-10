package org.LaunchCode.IT_Wizards_API.models;

public class ItemCategory extends AbstractEntity{

    //Fields
    private String name;

    //Constructors
    public ItemCategory(String name){
        this.name=name;
    }

    public ItemCategory(){}

    //Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //Methods
    @Override
    public String toString() {
        return name;
    }
}
