package org.LaunchCode.IT_Wizards_API.services;

import com.plaid.client.ApiClient;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

@Service
public class PlaidService {
    public Response<LinkTokenCreateResponse> createLinkToken() throws IOException {
        PlaidApi plaidClient;
        HashMap<String, String> apiKeys = new HashMap<String, String>();
        apiKeys.put("clientId", "669d27e8b7e14d001ac7b884");
        apiKeys.put("secret", "f292f639c530b860e14ad7e3606b34");
        ApiClient apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(ApiClient.Sandbox); // or equivalent, depending on which environment you're calling into
        plaidClient = apiClient.createService(PlaidApi.class);

        LinkTokenCreateRequestUser user =  new LinkTokenCreateRequestUser()
                .clientUserId("user-id")
                .phoneNumber("+1 415 5550123");

        LinkTokenTransactions transactions =  new LinkTokenTransactions()
                .daysRequested(730);

        DepositoryFilter depository =  new DepositoryFilter()
                .accountSubtypes(Arrays.asList(
                        DepositoryAccountSubtype.CHECKING,
                        DepositoryAccountSubtype.SAVINGS
                ));

        CreditFilter credit =  new CreditFilter()
                .accountSubtypes(Arrays.asList(CreditAccountSubtype.CREDIT_CARD));

        LinkTokenAccountFilters accountFilters =  new LinkTokenAccountFilters()
                .depository(depository)
                .credit(credit);

        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
                .user(user)
                .clientName("Personal Finance App")
                .products(Arrays.asList(Products.TRANSACTIONS))
                .transactions(transactions)
                .countryCodes(Arrays.asList(CountryCode.US))
                .language("en")
//                .webhook("https://sample-web-hook.com")
                .redirectUri("http://localhost:5173/")
                .accountFilters(accountFilters);
        Response<LinkTokenCreateResponse> response = plaidClient
                .linkTokenCreate(request)
                .execute();

        return response;

    }
}
