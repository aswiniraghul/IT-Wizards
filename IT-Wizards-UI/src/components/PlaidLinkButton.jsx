import React, { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

import { HOST_NAME } from '../env/config';

function PlaidLinkButton() {
  const [token, setToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    console.log("onSuccess - calling exchange public token:", publicToken);
    console.log("onSuccess - calling exchange metadata:", metadata);
    // setLoading(true);
    await fetch(`${HOST_NAME}/api/plaid/exchange_public_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    // await getBalance();
  }, []);
  const onExit = useCallback(async (error, metadata) => {
    console.log("onExit - error:", error);
    console.log("onExit - metadata:", metadata);
    if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
      console.log('Invalid link token, retry creating');
      // generate new link token
      createLinkToken();
    }
  }, []);
  const onEvent = useCallback(async (eventName, metadata) => {
    console.log("onEvent - eventName:", eventName);
    console.log("onEvent - metadata:", metadata);
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    console.log('createLinkToken...')
    // For OAuth, use previously generated Link token
    // if (window.location.href.includes("?oauth_state_id=")) {
    //   const linkToken = localStorage.getItem('link_token');
    //   setToken(linkToken);
    //   console.log('createLinkToken running with existing linkToken:', linkToken);
    // } else {
      const response = await fetch(`${HOST_NAME}/api/plaid/create_link_token`, {});
      const data = await response.json();
      console.log('createLinkToken data returned:', data);
      setToken(data.accessToken);
      localStorage.setItem("link_token", data.accessToken);
      console.log('createLinkToken created linkToken DATA:', data.accessToken);
    // }
  }, [setToken]);

  const config = {
    token,
    onSuccess: onSuccess,
    onExit: onExit,
    onEvent: onEvent,
  };

  const { open, exit, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      console.log('no token, go get one');
      createLinkToken();
    }
    // if (isOauth && ready) {
    if (ready) {
      console.log('should be ready and then opening')
      open();
    }
  // }, [token, isOauth, ready, open]);
  }, [token, ready, open]);

  return (
    <button onClick={() => open()
      } disabled={!ready}>
      <strong>Link account</strong>
    </button>
  );
}

export default PlaidLinkButton;
