import { useEffect, useState } from 'react';
import { getItems } from '../services/viewItemsService';
import cauldron from '../assets/images/cauldron.png';
import { Link } from 'react-router-dom';

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
    <section className="bg-purple-400">
      <div className="container bg-purple-400 m-auto max-w-6xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-3xl text-center font-semibold mb-2">Shop</h2>

          <div className="container m-auto max-w-5xl py-12">
            <table className="table-fixed border-separate border-spacing-6 border text-left border-purple-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((item) => {
                  return (
                    <div
                      classname="flex items-center justify-center"
                      key={item.id}
                    >
                      <Link to={`/items/${item.id}`}>
                        <img
                          src={cauldron}
                          className="max-w-xs flex items-center justify-center"
                        ></img>
                      </Link>

                      <div className="flex items-center justify-center">
                        {item.name}
                      </div>
                      <div className="flex items-center justify-center">
                        ${(Math.round(item.price * 100) / 100).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDisplay;
