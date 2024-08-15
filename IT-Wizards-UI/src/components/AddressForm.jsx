import React from 'react';

const AddressForm = ({ address, onAddressChange}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onAddressChange(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Street Address
        </label>
        <input
          id="street"
          name="address"
          className="border rounded w-full py-2 px-3"
          placeholder="Street Address"
          required
          value={address.address}
          onChange={handleInputChange}
        ></input>
      </div>

      <div className='flex'>
        <div className="mb-2 mr-10">
          <label className="block text-gray-700 mb-2">City</label>
          <input
            id="city"
            name="city"
            className="border rounded w-fit py-2 px-3 mb-2"
            placeholder="City"
            required
            value={address.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 mr-10 ml-10">
          <label className="block text-gray-700 mb-2">State</label>
          <input
            id="state"
            name="state"
            className="border rounded w-fit py-2 px-3"
            placeholder="State"
            value={address.state}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4 ml-10">
          <label className="block text-gray-700 mb-2">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            className="border rounded w-fit py-2 px-3"
            placeholder="Zipcode"
            value={address.zipcode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
