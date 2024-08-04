import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';

const SearchBar = ({setResults}) => {
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
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchSearchResults(value);
  };
  return (
    <div className="flex items-center m-auto w-full bg-purple-800 text-green-400">
      <form className="flex items-center max-w-sm mx-auto py-3">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="text"
            id="search"
            className="bg-black border border-gray-300 text-green-400 text-sm rounded-lg  block w-full ps-10 p-2.5"
            placeholder="Search for an item..."
            vaule={input}
            onChange={(e) => handleChange(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-lg font-medium text-black bg-green-500 rounded-lg border border-green-700 hover:bg-green-600 focus:ring-4 "
        >
          <MagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
