import React, { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);


    return (
      <div className="flex flex-row w-full bg-slate-500 py-4 px-2 justify-center h-[calc(100vh-5rem)]">
        <aside className="w-full">
          <div className="bg-gray-200 rounded p-2 mb-2">
            <button>Filter</button>
          </div>

          <div className="bg-gray-200 rounded items-center p-2 ">
            <button
              className="bg-transparent focus:outline-none"
              type="text"
              placeholder="Search foods"
            >
              Sort
            </button>
          </div>
        </aside>
      </div>
    );
};

export default Navbar;