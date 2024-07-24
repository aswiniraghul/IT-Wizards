package org.LaunchCode.IT_Wizards_API.models;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Address extends AbstractEntity {
    //Fields
    private String address;
    private String city;
    private String state;
    private Integer zipcode;


    @OneToMany(mappedBy = "address", cascade = CascadeType.ALL)
    private final List<Orders> orders = new ArrayList<>();

    //Constructors

    public Address(String address, String city, String state, Integer zipcode) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }

    public Address() {}

    //Getters and Setters

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
