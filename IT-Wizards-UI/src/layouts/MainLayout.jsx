import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../components/search/SearchBar';
import SearchResultsList  from '../components/search/SearchResultsList';
import { useState } from 'react';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer position='bottom-right' autoClose={2800} />
    </div>
  );
};

export default MainLayout;
