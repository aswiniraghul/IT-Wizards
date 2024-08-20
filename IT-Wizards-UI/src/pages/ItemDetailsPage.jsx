import ItemDetailDisplay from '../components/items/ItemDetailDisplay';
import { useState } from 'react';
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
