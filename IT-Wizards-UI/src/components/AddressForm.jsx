import React from 'react';

const ShippingForm = () => {
  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Street Address
        </label>
        <input
          id="street"
          name="street"
          className="border rounded w-full py-2 px-3"
          rows="1"
          placeholder="Street Address"
          required
          onChange={(e) => onInputChange(e)}
        ></input>
      </div>

      <div className='flex'>
        <div className="mb-2 mr-10">
          <label className="block text-gray-700 font-bold mb-2">City</label>
          <input
            id="city"
            name="city"
            className="border rounded w-fit py-2 px-3 mb-2"
            placeholder="City"
            required
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-2 mr-10 ml-10">
          <label className="block text-gray-700 font-bold mb-2">State</label>
          <input
            id="state"
            name="state"
            className="border rounded w-fit py-2 px-3"
            placeholder="State"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-4 ml-10">
          <label className="block text-gray-700 font-bold mb-2">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            className="border rounded w-fit py-2 px-3"
            placeholder="Zipcode"
            onChange={(e) => onInputChange(e)}
          />
        </div>
      </div>
    </form>
  );
};

export default ShippingForm;
