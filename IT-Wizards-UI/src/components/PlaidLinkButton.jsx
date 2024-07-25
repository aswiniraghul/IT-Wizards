// import React from 'react';
import { PlaidLink } from 'react-plaid-link';

const PlaidLinkButton = () => {
  const handleOnSuccess = (token, metadata) => {
    // Handle successful Plaid Link integration
    console.log('Link token:', token);
    console.log('Link metadata:', metadata);
  };

  const handleOnExit = (err, metadata) => {
    // Handle Plaid Link exit
    if (err != null) {
      console.error('Link exit error:', err);
    }
    console.log('Link exit metadata:', metadata);
  };

  return (
    <PlaidLink
      clientName="B.R.E.W.S"
      env="sandbox"
      product={['auth', 'transactions']}
      publicKey="669d27e8b7e14d001ac7b884"
      onSuccess={handleOnSuccess}
      onExit={handleOnExit}
    >
      Connect your bank account
    </PlaidLink>
  );
};

export default PlaidLinkButton;
