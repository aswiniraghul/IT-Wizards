import { NavLink } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <div className="flex flex-row w-full pl-2 bg-purple-800 border-black border-b-4 border-l-4 border-r-4 text-center h-[calc(100vh-5rem)]">
      <aside className="w-auto text-left text-white text-lg">
        <div>
          <button className="underline hover:font-bold py-4">About Us</button>
        </div>
        <div>
          <NavLink to="/ContactUs" className="underline hover:font-bold py-4">
            Contact Us
          </NavLink>
        </div>
      </aside>
    </div>
  );
};

export default RightSidebar;
