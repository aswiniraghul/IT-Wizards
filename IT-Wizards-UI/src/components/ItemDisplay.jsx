import { useEffect, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import cauldron from '../assets/images/cauldron.png';

const ItemDisplay = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <>
      {/* <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section> */}
      <div className="container m-auto max-w-6xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Shop</h2>

          <div className="container m-auto max-w-5xl py-12">
            <table className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
              {/* <thead>
                <tr className="text-green-600">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Item Category</th>
                  <th>Price</th>
                  <th>Current Inventory</th>
                  <th>Edit Item</th>
                  <th>Delete Item</th>
                </tr>
              </thead> */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => {
                  return (
                    <div
                      classname="flex items-center justify-center"
                      key={item.id}
                    >
                      <img
                        src={cauldron}
                        className="max-w-xs flex items-center justify-center"
                      ></img>
                      <div className="flex items-center justify-center">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-center">
                        ${item.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDisplay;
