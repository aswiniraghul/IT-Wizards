import { useState } from 'react';

const RightSidebar = () => {
  return (
    <div className="flex flex-row w-full bg-purple-800 pt-2 border-black border-b-4 border-l-4 border-r-4 text-center h-[calc(100vh-5rem)]">
      <aside className="w-auto text-green-400 text-lg py-4">
        <button className="hover:font-bold py-2">
          About Us
        </button>
        <button className='hover:font-bold py-2'>
          Contact Us
        </button>
      </aside>
    </div>
  );
};

export default RightSidebar;
