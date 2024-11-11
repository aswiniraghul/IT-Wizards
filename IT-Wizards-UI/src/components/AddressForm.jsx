import React from 'react';

const ShippingForm = ({ addressData = {}, onAddressChange }) => {
  const {
    streetAddress = '', 
    city = '', 
    state = '',
    zipcode = ''} = addressData;

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Street Address
        </label>
        <input
          id="streetAddress"
          name="streetAddress"
          className="border rounded w-full py-2 px-3"
          value={streetAddress}
          rows="1"
          placeholder="Street Address"
          required
          onChange={(e) => onAddressChange(e)}
        ></input>
      </div>

      <div className='flex'>
        <div className="mb-2 mr-10">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            id="city"
            name="city"
            className="border rounded w-fit py-2 px-3 mb-2"
            value={city}
            placeholder="City"
            required
            onChange={(e) => onAddressChange(e)}
          />
        </div>

        <div className="mb-2 mr-10 ml-10">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            id="state"
            name="state"
            className="border rounded w-fit py-2 px-3"
            value= {state}
            placeholder="State"
            onChange={(e) => onAddressChange(e)}
          />
        </div>

        <div className="mb-4 ml-10">
          <label className="block text-gray-700 mb-2">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            className="border rounded w-fit py-2 px-3"
            value= {zipcode}
            placeholder="Zipcode"
            onChange={(e) => onAddressChange(e)}
          />
        </div>
      </div>
    </form>
  );
};

export default ShippingForm;