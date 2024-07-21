package org.LaunchCode.IT_Wizards_API.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity{

    //Fields
    private String username;
    private String firstName;
    private String lastName;

    @OneToOne(cascade = CascadeType.ALL)
    private Cart cart;

    @OneToMany(mappedBy = "user")
    private final List<Orders> orders = new ArrayList<>();
    //Constructors

    public User(String username, String firstName, String lastName, Cart cart) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cart = cart;
    }

    public User() {}

    //Getters and Setters

    public List<Orders> getOrders() {return orders;}

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getFirstName() {return firstName;}

    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public Cart getCarts() {return cart;}

    public void setCarts(Cart cart) {this.cart = cart;}
}
