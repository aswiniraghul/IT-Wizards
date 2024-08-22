package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(name = "login_role", nullable = false)
    private String loginRole;

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Cart> cart = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private final List<Orders> orders = new ArrayList<>();

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Wishlist> wishlist = new ArrayList<>();

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Address> addresses = new ArrayList<>();
}
