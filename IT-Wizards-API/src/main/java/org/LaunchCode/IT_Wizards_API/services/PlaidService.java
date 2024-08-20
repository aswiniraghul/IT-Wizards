package org.LaunchCode.IT_Wizards_API.services;

import com.plaid.client.ApiClient;
import com.plaid.client.model.*;
import com.plaid.client.request.PlaidApi;
import com.sun.net.httpserver.HttpExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;


@Service
public class PlaidService {
    //        public String createLinkToken(HttpExchange t) throws IOException {
//    public LinkTokenCreateResponse createLinkToken() throws IOException {
    public ItemPublicTokenExchangeResponse createLinkToken() throws IOException {
        String TARTAN_BANK_INSTITUTION_ID = "ins_109511";
        HashMap<String, String> apiKeys = new HashMap<String, String>();
        apiKeys.put("clientId", "669d27e8b7e14d001ac7b884");
        apiKeys.put("secret", "f292f639c530b860e14ad7e3606b34");
        ApiClient apiClient = new ApiClient(apiKeys);
        apiClient.setPlaidAdapter(ApiClient.Sandbox);

        PlaidApi plaidClient = apiClient.createService(PlaidApi.class);

        PlaidApi client = apiClient.createService(PlaidApi.class);

//        LinkTokenTransactions transactions = new LinkTokenTransactions()
//                .daysRequested(730);
//
//        DepositoryFilter depository = new DepositoryFilter()
//                .accountSubtypes(Arrays.asList(
//                        DepositoryAccountSubtype.CHECKING,
//                        DepositoryAccountSubtype.SAVINGS
//                ));
//
//        CreditFilter credit = new CreditFilter()
//                .accountSubtypes(Arrays.asList(CreditAccountSubtype.CREDIT_CARD));
//
//        LinkTokenAccountFilters accountFilters = new LinkTokenAccountFilters()
//                .depository(depository)
//                .credit(credit);
//
//        LinkTokenCreateRequestUser user = new LinkTokenCreateRequestUser()
//                .clientUserId("user-id")
//                .phoneNumber("+1 415 5550123");
//
//        LinkTokenCreateRequest request = new LinkTokenCreateRequest()
//                .user(user)
//                .clientName("IT Wizards B.R.E.W.S.")
////                .products(Arrays.asList(Products.fromValue("transactions")))
//                .products(Arrays.asList(Products.TRANSACTIONS))
//                .transactions(transactions)
//                .countryCodes(Arrays.asList(CountryCode.US))
//                .language("en")
//                .webhook("https://sample-web-hook.com")
//                .redirectUri("https://domainname.com/oauth-page.html")
//                .accountFilters(accountFilters);
//
//        Response<LinkTokenCreateResponse> response = plaidClient
//                .linkTokenCreate(request)
//                .execute();

        SandboxPublicTokenCreateRequest createRequest = new SandboxPublicTokenCreateRequest()
                .institutionId(TARTAN_BANK_INSTITUTION_ID)
                .initialProducts(Arrays.asList(Products.AUTH));

        Response<SandboxPublicTokenCreateResponse> createResponse = client
                .sandboxPublicTokenCreate(createRequest)
                .execute();

        // The generated public_token can now be
        // exchanged for an access_token
        ItemPublicTokenExchangeRequest exchangeRequest = new ItemPublicTokenExchangeRequest()
                .publicToken(createResponse.body().getPublicToken());

        Response<ItemPublicTokenExchangeResponse> exchangeResponse = client
                .itemPublicTokenExchange(exchangeRequest)
                .execute();

//        String linkToken = response.body().getLinkToken();
        // Send the data to the client
//        return response.body();
//        assert response.body() != null;
        return exchangeResponse.body();
    }
}


