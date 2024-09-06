package org.LaunchCode.IT_Wizards_API.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class OrderItems extends AbstractEntity {

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "item_name")
    private String itemName;

    private Integer quantity;

    private Double price;

    // Constructors
    public OrderItems() {}

    public OrderItems(Orders order, Item item, Integer quantity, Double price) {
        this.order = order;
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.itemName = item.getName();
    }

    // Getters and Setters
    public Orders getOrder() {return order;}

    public void setOrder(Orders order) {this.order = order;}

    public Item getItem() {return item;}

    public void setItem(Item item) {
        this.item = item;
        this.itemName = item.getName();}

    public String getItemName() {return itemName;}

    public void setItemName(String itemName) {this.itemName = itemName;}

    public Integer getQuantity() {return quantity;}

    public void setQuantity(Integer quantity) {this.quantity = quantity;}

    public Double getPrice() {return price;}

    public void setPrice(Double price) {this.price = price;}
}
