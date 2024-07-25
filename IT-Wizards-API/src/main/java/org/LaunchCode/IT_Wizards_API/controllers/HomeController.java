package org.LaunchCode.IT_Wizards_API.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/home")
public class HomeController {
    @GetMapping
    public String index() {
        return "index";
    }
}
