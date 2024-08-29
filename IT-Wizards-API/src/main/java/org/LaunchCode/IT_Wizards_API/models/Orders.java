package org.LaunchCode.IT_Wizards_API.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Orders extends AbstractEntity{

    //Fields
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    @JsonIgnore
    private Address address;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItems> orderItems = new ArrayList<>();

    private double totalPrice;

    //Constructors

    public Orders(User user, Address address) {
        this.user = user;
        this.address = address;
    }


    public Orders() {}

    //Getters and Setters

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}

    public Address getAddress() {return address;}

    public void setAddress(Address address) {this.address = address;}

    public List<OrderItems> getOrderItems() {return orderItems;}

    public void setOrderItems(List<OrderItems> orderItems) {this.orderItems = orderItems;}

    public double getTotalPrice() {return totalPrice;}

    public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
}
