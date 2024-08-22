import React, { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HOST_NAME } from '../env/config';
import axios from 'axios';

function PlaidLinkButton({onFinished}) {
  const [token, setToken] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    console.log("onSuccess - calling exchange public token:", publicToken);
    console.log("onSuccess - calling exchange metadata:", metadata);
    // // Set banking data
    // setLoading(true);
    // await fetch(`${HOST_NAME}/api/plaid/exchange_public_token`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ public_token: publicToken }),
    // });
    // await getBalance();
    setPaymentData(metadata);
    toast.success("💸 Payment applied 💸")
    setTimeout(onFinished, 5000);
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
    // For OAuth, use previously generated Link token
    // if (window.location.href.includes("?oauth_state_id=")) {
    //   const linkToken = localStorage.getItem('link_token');
    //   setToken(linkToken);
    //   console.log('createLinkToken running with existing linkToken:', linkToken);
    // } else {
      const response = await axios.get(`${HOST_NAME}/api/plaid/create_link_token`);
      setToken(response.data);
      localStorage.setItem("link_token", response.data);
      console.log('setting token: ', response.data);
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
      // Can open when ready, or wait for button click
      // open();
    }
  // }, [token, isOauth, ready, open]);
  }, [token, ready, open]);

  if(paymentData) {
    console.log(paymentData);
    return (
      <div>Payment will process through your {paymentData.institution.name} account</div>
    )
  } else {
    return (
      <button className={` w-fit my-6 py-2 font-extrabold border-4 align-middle border-purple-700 rounded-xl px-2`}
        onClick={() => open()}
        disabled={!ready}
      >
        <strong>Select Payment Method</strong>
      </button>
    );
  }
}

export default PlaidLinkButton;
