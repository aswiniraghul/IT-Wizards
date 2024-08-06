import ItemDisplay from "../components/ItemDisplay";
import { useState } from "react";
import SearchBar from "../components/search/SearchBar";
import SearchResultsList from "../components/search/SearchResultsList";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <SearchBar setSearchTerm={setSearchTerm} setResults={setResults} />
      <SearchResultsList results={results} />
      <ItemDisplay searchTerm={searchTerm} />
    </div>
  );
};

export default HomePage;
