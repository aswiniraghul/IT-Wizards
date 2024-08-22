package org.LaunchCode.IT_Wizards_API.controllers;

import com.plaid.client.model.*;
import retrofit2.Response;

import java.io.IOException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.LaunchCode.IT_Wizards_API.services.PlaidService;

@RestController
@RequestMapping("/api/plaid")
public class PlaidController {

    private final PlaidService plaidService;

    public PlaidController(PlaidService plaidService) {
        this.plaidService = plaidService;
    }

    @GetMapping("/create_link_token")
    public ResponseEntity<String> createLinkToken() {
        try {
            Response<LinkTokenCreateResponse> linkToken = plaidService.createLinkToken();
            System.out.println(linkToken);
            return new ResponseEntity<String>(linkToken.body().getLinkToken(), HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
