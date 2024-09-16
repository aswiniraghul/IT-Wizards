package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.AddressRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.AddressNotFoundException;
import org.LaunchCode.IT_Wizards_API.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.LaunchCode.IT_Wizards_API.models.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/addresses")
public class    AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping()
    Address newAddress(@RequestParam String userName, @RequestBody Address userAddress) {
        User user = userRepository.findByUserName(userName);

        userAddress.setUser(user);
        return addressRepository.save(userAddress);
    }
  
    @GetMapping("/{id}")
    Address getAddressById(@PathVariable Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException(id));
    }

}
