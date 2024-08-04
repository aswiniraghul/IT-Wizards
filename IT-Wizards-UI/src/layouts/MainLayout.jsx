import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/search/SearchBar';
import SearchResultsList  from '../components/search/SearchResultsList';
import { useState } from 'react';

const MainLayout = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      <Navbar />
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
