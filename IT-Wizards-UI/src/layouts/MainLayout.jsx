import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer position='bottom-right' autoClose={1800} />
    </div>
  );
};

export default MainLayout;
