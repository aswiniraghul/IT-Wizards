package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Item extends AbstractEntity{

    //Fields
    private String name;
    private String description;
    @ManyToOne(cascade = CascadeType.ALL)
    private ItemCategory itemCategory;
    private Double price;
    private int currentInventory;

    //Constructors;
    public Item(String name, String description, ItemCategory itemCategory, Double price, int currentInventory) {
        this.name = name;
        this.description = description;
        this.itemCategory = itemCategory;
        this.price = price;
        this.currentInventory = currentInventory;
    }

    public Item(){}

    //Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ItemCategory getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(ItemCategory itemCategory) {
        this.itemCategory = itemCategory;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getCurrentInventory() {
        return currentInventory;
    }

    public void setCurrentInventory(int currentInventory) {
        this.currentInventory = currentInventory;
    }

    //Methods
    @Override
    public String toString() {
        return name;
    }
}
