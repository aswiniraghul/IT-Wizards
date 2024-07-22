package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.Repository.UserRepository;
import org.LaunchCode.IT_Wizards_API.models.Response;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        try {
            if (userRepository.findByUserName(user.getUserName()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new Response("Username already exists"));
            }
            userRepository.save(user);
            return new ResponseEntity<>(new Response("User signed up successfully"), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
