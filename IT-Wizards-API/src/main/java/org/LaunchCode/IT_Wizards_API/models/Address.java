package org.LaunchCode.IT_Wizards_API.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Address extends AbstractEntity {
    //Fields
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private String address;
    private String city;
    private String state;
    private Integer zipcode;


    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private final List<Orders> orders = new ArrayList<>();

    //Constructors

    public Address(User user, String address, String city, String state, Integer zipcode) {
        this.user = user;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    public Address(String address, String city, String state, Integer zipcode) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    public Address() {}

    //Getters and Setters


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {return address;}

    public void setAddress(String address) {this.address = address;}

    public String getCity() {return city;}

    public void setCity(String city) {this.city = city;}

    public String getState() {return state;}

    public void setState(String state) {this.state = state;}

    public Integer getZipcode() {return zipcode;}

    public void setZipcode(Integer zipcode) {this.zipcode = zipcode;}

    public List<Orders> getOrders() {return orders;}
}
