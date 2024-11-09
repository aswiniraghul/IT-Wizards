package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "mail_id")
    private String mailId;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "zipcode")
    private String zipcode;

    @Column(name = "login_role", nullable = false)
    private String loginRole;

    @OneToOne(mappedBy ="user", cascade = CascadeType.ALL)
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<Orders> orders = new ArrayList<>();

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Wishlist> wishlist = new ArrayList<>();


    @Setter
    @Getter
    @ManyToMany
    @JoinTable(
            name = "user_favourite",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns =  @JoinColumn(name = "item_id")
    )
    private Set<Item> favourites = new HashSet<>();
}
