import React from 'react';

const ItemsPage = (props) => {
  return (
    <>
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-6">Items</h2>

          <div className="container m-auto max-w-2xl py-24">
            <table className="table-fixed border-separate border-spacing-8 border border-purple-600">
              <thead>
                <tr className="text-green-600">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Item Category</th>
                  <th>Price</th>
                  <th>Current Inventory</th>
                </tr>
              </thead>
              <tbody >
                
                              {props.items.map((item) => {
                                  return (
                                    <tr key={item.id}>
                                      <th>{item.name}</th>
                                      <th>{item.description}</th>
                                      <th>{item.itemCategory.name}</th>
                                      <th>{item.price}</th>
                                      <th>{item.currentInventory}</th>
                                    </tr>
                                  );
                              })}     



                              {/* {props.items.map((item) => {
                  <tr key={props.items.id}>
                    <th>{props.items[0].name}</th>
                    <th>{props.items[0].description}</th>
                    <th>{props.items[0].itemCategory.name}</th>
                    <th>{props.items[0].price}</th>
                    <th>{props.items[0].currentInventory}</th>
                  </tr> */}
                 {/* })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsPage;
