package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Orders extends AbstractEntity{

    //Fields
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private final List<CartItem> cartItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    //Constructors

    public Orders(User user, Address address) {
        this.user = user;
        this.address = address;
    }

    public Orders() {}

    //Getters and Setters

    public List<CartItem> getCartItems() {return cartItems;}

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}

    public Address getAddress() {return address;}

    public void setAddress(Address address) {this.address = address;}

    public Cart getCart() { return cart; }

    public void setCart(Cart cart) { this.cart = cart; }
}
