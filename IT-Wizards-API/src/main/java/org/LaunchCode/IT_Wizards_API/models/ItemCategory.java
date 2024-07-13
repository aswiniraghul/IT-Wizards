package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ItemCategory extends AbstractEntity{

    //Fields
    private String name;

    @OneToMany(mappedBy = "itemCategory")
    private final List<Item> items = new ArrayList<>();

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
