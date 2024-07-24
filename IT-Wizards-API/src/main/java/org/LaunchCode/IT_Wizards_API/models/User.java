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


    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Cart> cart = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<Orders> orders = new ArrayList<>();
  
    //Constructors

    public User(String username, String firstName, String lastName) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User() {}

    //Getters and Setters

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getFirstName() {return firstName;}

    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public List<Cart> getCart() {return cart;}

    public List<Orders> getOrders() {return orders;}

}
