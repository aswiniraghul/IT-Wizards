import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ setResults, setSearchTerm, results }) => {
  const [input, setInput] = useState('');

  const fetchSearchResults = (value) => {
    fetch('http://localhost:8080/items')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((item) => {
          return (
            value &&
            item &&
            item.name &&
            item.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        setSearchTerm(value);
      });
  };

  const navigate = useNavigate();

  const handleChange = (value) => {
    setInput(value);
    fetchSearchResults(value);
  };

  return (
    <div className="flex items-center border-l-4 border-r-4 border-b-4 border-black m-auto w-full bg-purple-800 text-green-400">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (input.length === 0) {
            return;
          }
          navigate(`/items/${results[0].id}`);
        }}
        className="flex items-center max-w-sm mx-auto py-3"
      >
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <input
            type="text"
            id="search"
            className="bg-black border border-gray-300 text-green-400 text-sm rounded-lg  block w-full ps-10 p-2.5"
            placeholder="Search for an item..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
            if (input.length === 0) {
              return;
            }
            navigate(`/items/${results[0].id}`);
          }}
          className="p-2.5 ms-2 text-lg font-medium text-black bg-green-500 rounded-lg border border-green-700 hover:bg-green-600 focus:ring-4 "
        >
          <MagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
