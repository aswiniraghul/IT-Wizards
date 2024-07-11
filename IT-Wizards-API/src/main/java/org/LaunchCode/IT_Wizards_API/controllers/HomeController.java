package org.LaunchCode.IT_Wizards_API.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
    @GetMapping
    public String index() {
        return "index";
    }
}
