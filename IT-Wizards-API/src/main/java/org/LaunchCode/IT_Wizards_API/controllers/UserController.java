package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.LaunchCode.IT_Wizards_API.models.Response;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        try {
            if (userRepository.findByUserName(user.getUserName()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new Response("Username already exists"));
            }
            user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            userRepository.save(user);
            return new ResponseEntity<>(new Response("User signed up successfully"), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User userDetails) {
        String username = userDetails.getUserName();
        String password = userDetails.getUserPassword();

        User user = userRepository.findByUserName(username);
        if (user != null && passwordEncoder.matches(password, user.getUserPassword())) {
            user.setUserPassword(null);
            return ResponseEntity.ok(user);
        } else {
            if (user != null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response("Invalid credentials. Please try again."));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response("User doesn't exist"));
            }
        }
    }

    @GetMapping("/{userName}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String userName) {
        try {
            User user = userRepository.findByUserName(userName);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Response("User not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{userName}")
    public ResponseEntity<?> updateUserByUsername(@PathVariable String userName, @RequestBody User updatedUser) {
        try {
            User existingUser = userRepository.findByUserName(userName);
            if (existingUser != null) {

                existingUser.setFirstName(updatedUser.getFirstName());
                existingUser.setLastName(updatedUser.getLastName());

                if (updatedUser.getUserPassword() != null && !updatedUser.getUserPassword().isEmpty()) {
                    if (!isPasswordEncoded(updatedUser.getUserPassword())) {
                        String encryptedPassword = passwordEncoder.encode(updatedUser.getUserPassword());
                        existingUser.setUserPassword(encryptedPassword);
                    } else {
                        existingUser.setUserPassword(updatedUser.getUserPassword());
                    }
                }

                existingUser.setMailId(updatedUser.getMailId());
                existingUser.setLoginRole(updatedUser.getLoginRole());

                userRepository.save(existingUser);
                return new ResponseEntity<>(new Response("User updated successfully"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Response("User not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userName}")
    public ResponseEntity<?> deleteUserByUsername(@PathVariable String userName) {
        try {
            User existingUser = userRepository.findByUserName(userName);
            if (existingUser != null) {
                userRepository.deleteByUserName(userName);
                return new ResponseEntity<>(new Response("User deleted successfully"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Response("User not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean isPasswordEncoded(String password) {
        return password != null && (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$"));
    }
}
