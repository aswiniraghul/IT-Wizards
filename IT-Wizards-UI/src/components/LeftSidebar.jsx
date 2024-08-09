import React, { useState } from 'react';

const Navbar = () => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  return (
    <div className="flex flex-row w-full bg-purple-800 pt-8 border-black border-4 pl-4 justify-left h-[calc(100vh-5rem)]">
      <aside className="w-auto">
        <div className="text-green-400 text-xl hover:font-bold">
          <button onClick={toggleFilterDropdown}>Filter</button>
        </div>
        {filterDropdownOpen ? (
          <div className="ml-2">
            <ul className="text-green-400 ">
              <li className="py-1 hover:font-bold">
                <button className="text-sm">By Category</button>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}

        <div className="text-green-400 text-xl hover:font-bold mt-4 mb-1">
          <button onClick={toggleSortDropdown}>Sort</button>
        </div>
        {sortDropdownOpen ? (
          <div className="ml-2">
            <ul className="text-green-400 ">
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
