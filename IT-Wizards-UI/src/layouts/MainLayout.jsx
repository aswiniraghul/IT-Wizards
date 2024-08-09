import { Outlet } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
      <ToastContainer position='bottom-right' autoClose={2800} />
    </div>
  );
};

export default MainLayout;
