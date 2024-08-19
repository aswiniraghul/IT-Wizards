// import React from 'react';
import React, { useCallback } from "react";
import {
  PlaidLink,
  // usePlaidLink,
} from 'react-plaid-link';

import { HOST_NAME } from '../env/config';

const PlaidLinkButton = () => {
  const [linkToken, setLinkToken] = React.useState('');

  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance
  // const config = {
  //   onSuccess: (public_token, metadata) => {
  //     console.log('public_token and metadata', public_token, metadata);
  //   },
  //   onExit: (err, metadata) => {
  //     console.log('err and metadata', err, metadata);
  //   },
  //   onEvent: (eventName, metadata) => {
  //     console.log('eventName and metadata', eventName, metadata);
  //   },
  //   token: 'GENERATED_LINK_TOKEN',
  // };
  // const { open, exit, ready } = usePlaidLink(config);

  // console.log('open', open);
  // console.log('exit', exit);
  // console.log('ready', ready);


  const handleOnSuccess = (public_token, metadata) => {
    console.log('onSuccess callback public_token', public_token);
    console.log('onSuccess callback metadata', metadata);
  }
  const handleOnExit = (error, metadata) => {
    console.log('onExit callback error', error);
    console.log('onExit callback metadata', metadata);
  }
  const handleOnEvent = (eventName, metadata) => {
      // Handle errors here
      console.error('Plaid Link Event:', eventName, metadata);
  };

  // const onSuccess = useCallback(
  //   (public_token, metadata) => {
  //     console.log('onSuccess callback public_token', public_token);
  //     console.log('onSuccess callback metadata', metadata);
  //     // log and save metadata
  //     // exchange public token
  //       // might be better with plaid distinction
  //       // fetch(`${HOST_NAME}/plaid/exchange-public-token`, {
  //     fetch(`${HOST_NAME}/exchange-public-token`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: {
  //         public_token,
  //       },
  //     }).then(response => response.text())
  //     .then(data => {
  //       console.log('Access Token:', data);
  //     });
  //   },
  //   [],
  // );
  // const onExit = useCallback(
  //   (error, metadata) => {
  //     console.log('onExit callback error', error);
  //     console.log('onExit callback metadata', metadata);
  //     // log and save error and metadata
  //     // handle invalid link token
  //     if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
  //       // generate new link token
  //     }
  //     // to handle other error codes, see https://plaid.com/docs/errors/
  //   },
  //   [],
  // );
  // const onError = useCallback(
  //   (error, metadata) => {
  //     console.log('onExit callback error', error);
  //     console.log('onExit callback metadata', metadata);
  //     // log and save error and metadata
  //     // handle invalid link token
  //     if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
  //       // generate new link token
  //     }
  //     // to handle other error codes, see https://plaid.com/docs/errors/
  //   },
  //   [],
  // );

  return (
    <PlaidLink
      clientName="B.R.E.W.S"
      env="sandbox"
      product={['auth', 'transactions']}
      publicKey={"669d27e8b7e14d001ac7b884"}
      onSuccess={handleOnSuccess}
      onExit={handleOnExit}
      onEvent={handleOnEvent}
    >
      Connect your bank account
    </PlaidLink>
  );
};

export default PlaidLinkButton;
