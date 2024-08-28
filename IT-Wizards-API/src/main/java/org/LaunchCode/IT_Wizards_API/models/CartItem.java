package org.LaunchCode.IT_Wizards_API.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class CartItem extends AbstractEntity{

    //Fields
    private Integer quantity;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="cart_id")
    private Cart cart;

//    @ManyToOne
//    @JoinColumn(name="order_id")
//    private Orders order;

    @ManyToOne
    @JoinColumn(name="item_id")
    private Item item;

    //Constructors

    public CartItem(Integer quantity, Cart cart, Item item) {
        this.quantity = quantity;
        this.cart = cart;
//        this.order = order;
        this.item = item;
    }

    public CartItem() {}

    //Getters and Setters

    public Integer getQuantity() {return quantity;}

    public void setQuantity(Integer quantity) {this.quantity = quantity;}

    public Cart getCart() {return cart;}

    public void setCart(Cart cart) {this.cart = cart;}

//    public Orders getOrder() {return order;}
//
//    public void setOrder(Orders order) {this.order = order;}

    public Item getItem() {return item;}

    public void setItem(Item item) {this.item = item;}

}
