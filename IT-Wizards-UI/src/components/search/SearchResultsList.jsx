import React from 'react'
import SearchResult from './SearchResult';

const SearchResults = ({results}) => {
  return (
    <div className='bg-black text-green-500 w-full overflow-y-scroll'>
          {results.map((result, id) => {
              return <SearchResult result={result} key={id}/>
      })}
    </div>
  );
}

export default SearchResults
