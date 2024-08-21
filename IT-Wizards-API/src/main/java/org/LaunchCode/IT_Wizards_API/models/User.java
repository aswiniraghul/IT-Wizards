package org.LaunchCode.IT_Wizards_API.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "login_role", nullable = false)
    private String loginRole;

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL)
    private final List<Cart> cart = new ArrayList<>();

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
            inverseJoinColumns =  @JoinColumn(name = "favourite_id")
    )
    @JsonIgnore // Prevent serialization of this property
    private Set<Favourite> favourites = new HashSet<>();

    public void addFavourite(Favourite favourite) {
        favourites.add(favourite);
        favourite.getUsers().add(this); // Bidirectional
    }

}
