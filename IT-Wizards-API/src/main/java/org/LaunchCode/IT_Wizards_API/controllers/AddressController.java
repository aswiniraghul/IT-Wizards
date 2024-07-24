package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.data.AddressRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.AddressNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @PostMapping()
    Address newAddress(@RequestBody Address newAddress) {
        return addressRepository.save(newAddress);
    }

    @GetMapping()
    List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    @GetMapping("/address/{id}")
    Address getAddressById(@PathVariable Long id) {
        return addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException(id));
    }
}
