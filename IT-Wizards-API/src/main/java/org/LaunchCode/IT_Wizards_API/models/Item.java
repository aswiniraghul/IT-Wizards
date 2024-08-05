package org.LaunchCode.IT_Wizards_API.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


@Entity
public class Item extends AbstractEntity{

    //Fields

    @Size(max=30)
    @NotNull
    private String name;
    @Size(max=240)
    @NotNull
    private String description;

    @ManyToOne
    @JoinColumn(name="item_category_id")
    private ItemCategory itemCategory;

    private Double price;
    @NotNull
    private Double currentInventory;

    @OneToMany(mappedBy ="item", cascade = CascadeType.ALL)
    private final List<Wishlist> wishlists = new ArrayList<>();

//    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
//    private final List<CartItem> cartItems = new ArrayList<>();

    //Constructors;
    public Item(String name, String description, ItemCategory itemCategory, Double price, Double currentInventory) {
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

    public Double getCurrentInventory() {
        return currentInventory;
    }

    public void setCurrentInventory(Double currentInventory) {
        this.currentInventory = currentInventory;
    }

    //Methods
    @Override
    public String toString() {
        return name;
    }
}
