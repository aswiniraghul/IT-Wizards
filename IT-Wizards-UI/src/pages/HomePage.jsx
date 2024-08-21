import LeftSidebar from '../components/LeftSidebar';
import ItemDisplay from '../components/ItemDisplay';
import RightSidebar from '../components/RightSidebar';
import { useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import SearchResultsList from '../components/search/SearchResultsList';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);

  return (
    <div onClick={()=> setResults([])}>
      <SearchBar
        setSearchTerm={setSearchTerm}
        setResults={setResults}
        results={results}
      />
      <SearchResultsList results={results} />
      <div className="flex flex-row h-[calc(100vh-5rem)]">
        <div className="w-1/12">
          <LeftSidebar setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} />
        </div>
        <div className="w-5/6 overflow-y-auto">
          <ItemDisplay searchTerm={searchTerm} categoryFilter={categoryFilter} />
        </div>
        <div className="w-1/12">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
