import React from 'react'
import SearchResult from './SearchResult';

const SearchResults = ({results}) => {
  return (
    <div className="container w-1/2 items-center md:flex-row">
      <div className="container w-1/2 rounded-xl absolute text-center bg-black text-green-500 overflow-y-scroll">
        {results.map((result, id) => {
          return <SearchResult result={result} key={id} />;
        })}
      </div>
    </div>
  );
}

export default SearchResults
