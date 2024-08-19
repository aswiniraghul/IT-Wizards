import React, { useState, useEffect } from 'react';
import ItemFilter from './Filter/ItemFilter';
import { getItemCategoryList } from '../services/viewItemsService';


const Navbar = ({ categoryFilter, setCategoryFilter }) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [categoryFilter, setCategoryFilter] = useState([]);


    useEffect(() => {
      fetchCategories();
    }, []);
  
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

    const fetchCategories = async () => {
      try {
        const data = await getItemCategoryList();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch category data', error);
      }
    };
  

  return (
    <div className="flex flex-row w-full bg-purple-800 pt-8 border-black border-l-4 border-r-4 border-b-4 pl-2 justify-left h-[calc(100vh-5rem)]">
      <aside className="w-auto">
        <div className="text-white text-xl hover:font-bold">
          <button onClick={toggleFilterDropdown} className="underline">Filter</button>
        </div>
        {filterDropdownOpen ? (
          <div className="ml-1">
            <ul className="text-white text-sm">
              <li className="py-1">
                <ItemFilter
                  filters={categories}
                  callbackFunc={setCategoryFilter}
                  setValue={categoryFilter.length ? categoryFilter : categories}
                />
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}

        <div className="text-white text-xl  hover:font-bold mt-4 mb-1">
          <button onClick={toggleSortDropdown} className="underline">Sort</button>
        </div>
        {sortDropdownOpen ? (
          <div className="ml-2">
            <ul className="text-white ">
              <li className="py-1 hover:font-bold">
                <button className="text-sm">By Name</button>
              </li>
              <li className="py-1 hover:font-bold">
                <button className="text-sm">By Price</button>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}
      </aside>
    </div>
  );
};

export default Navbar;
