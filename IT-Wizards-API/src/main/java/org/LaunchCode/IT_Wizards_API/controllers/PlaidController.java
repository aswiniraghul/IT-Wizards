package org.LaunchCode.IT_Wizards_API.controllers;

import com.plaid.client.ApiClient;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import retrofit2.Response;
import org.LaunchCode.IT_Wizards_API.models.User;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;


import com.plaid.client.ApiClient;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.LaunchCode.IT_Wizards_API.services.PlaidService;

@RestController
@RequestMapping("/create_link_token")
public class PlaidController {

    private final PlaidService plaidService;

    public PlaidController(PlaidService plaidService) {
        this.plaidService = plaidService;
    }

    @PostMapping()
    public ResponseEntity<ItemPublicTokenExchangeResponse> createLinkToken() {
        try {
            ItemPublicTokenExchangeResponse linkToken = plaidService.createLinkToken();
            System.out.println(linkToken);
            return new ResponseEntity<ItemPublicTokenExchangeResponse>(linkToken, HttpStatus.OK);
//            LinkTokenCreateResponse linkToken = plaidService.createLinkToken();
//            return new ResponseEntity<>(linkToken.getLinkToken(), HttpStatus.OK);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}




//public class PlaidController {
//    static class GetLinkToken implements HttpHandler {
//        private static PlaidApi plaidClient;
//        public void handle(HttpExchange t) throws IOException {
//            // Create your Plaid client
//            HashMap<String, String> apiKeys = new HashMap<String, String>();
////            apiKeys.put("clientId", CLIENT_ID);
//            apiKeys.put("clientId", "669d27e8b7e14d001ac7b884");
////            apiKeys.put("secret", SECRET);
//            apiKeys.put("secret", "f292f639c530b860e14ad7e3606b34");
//            ApiClient apiClient = new ApiClient(apiKeys);
//            apiClient.setPlaidAdapter(ApiClient.Sandbox);
//            plaidClient = apiClient.createService(PlaidApi.class);
//            // Get the clientUserId by searching for the current user
////            User userFromDB = db.find(...);
////            String clientUserId = userFromDB.id;
//            String clientUserId = "1234";
//            LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser()
//                    .clientUserId(clientUserId);
//            // Create a link_token for the given user
//            LinkTokenCreateRequest request = new LinkTokenCreateRequest()
//                    .user(user)
//                    .clientName("Plaid Test App")
//                    .products(Arrays.asList(Products.fromValue("transactions")))
//                    .countryCodes(Arrays.asList(CountryCode.US))
//                    .language("en")
//                    .redirectUri("https://domainname.com/oauth-page.html")
//                    .webhook("https://webhook.example.com");
//            Response<LinkTokenCreateResponse> response = plaidClient
//                    .linkTokenCreate(request)
//                    .execute();
//            // Send the data to the client
//            return response.body();
//        }
//    }
//}
//






























//
//import com.plaid.client.ApiClient;
//import com.plaid.client.api.LinkTokenApi;
//import com.plaid.client.model.LinkTokenCreateRequest;
//import com.plaid.client.model.LinkTokenCreateResponse;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/plaid")
//public class PlaidController {
//
//    private final LinkTokenApi linkTokenApi;
//
//    public PlaidController() {
//        ApiClient apiClient = new ApiClient();
//        apiClient.setBasePath("https://sandbox.plaid.com"); // Use appropriate environment URL
//        apiClient.setApiKey("YOUR_CLIENT_ID", "YOUR_SECRET"); // Set your Plaid credentials
//        this.linkTokenApi = new LinkTokenApi(apiClient);
//    }
//
//    @GetMapping("/link_token")
//    public String getLinkToken() {
//        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
//                .clientName("Your App Name")
//                .products(Arrays.asList("auth", "transactions"))
//                .countryCodes(Arrays.asList("US"))
//                .language("en");
//
//        try {
//            LinkTokenCreateResponse response = linkTokenApi.linkTokenCreate(request);
//            return response.getLinkToken();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error: " + e.getMessage();
//        }
//    }
//}
//
//
//




















////import com.plaid.client.request.ItemPublicTokenExchangeRequest;
////import com.plaid.client.response.ItemPublicTokenExchangeResponse;
////import com.plaid.client.PlaidClient;
//import com.plaid.client.model.ItemPublicTokenExchangeResponse;
//import com.plaid.client.model.ItemPublicTokenExchangeRequest;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class PlaidController {
////
////    @Autowired
//////    private PlaidClient plaidClient;
////
////    @GetMapping("/exchange-public-token")
////    public String exchangeToken(@RequestParam String publicToken) {
////        try {
////            ItemPublicTokenExchangeRequest request = new ItemPublicTokenExchangeRequest(publicToken);
//////            ItemPublicTokenExchangeResponse response = plaidClient.service().itemPublicTokenExchange(request).execute().body();
////            return response.getAccessToken();
////        } catch (Exception e) {
////            e.printStackTrace();
////            return "Error: " + e.getMessage();
////        }
////    }
//}