import ItemDetailDisplay from '../components/ItemDetailDisplay';
import { useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import SearchResultsList from '../components/search/SearchResultsList';

const ItemDetailsPage = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <SearchResultsList results={results} />
      <ItemDetailDisplay />
    </div>
  );
};

export default ItemDetailsPage;
