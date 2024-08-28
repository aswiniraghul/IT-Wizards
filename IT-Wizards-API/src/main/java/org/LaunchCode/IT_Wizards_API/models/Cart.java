package org.LaunchCode.IT_Wizards_API.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart extends AbstractEntity{

    @JsonIgnore
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private final List<CartItem> cartItems = new ArrayList<>();

    @JsonIgnore
    @OneToOne
    @JoinColumn(name="user_id")
      private User user;

    //Constructors

    public Cart(User user) {
        this.user = user;
    }

    public Cart() {
    }

    //Getters and Setters

    public List<CartItem> getCartItems() {return cartItems;}

    public User getUser() {return user;}

    public void setUser(User user) {this.user = user;}
}
