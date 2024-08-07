import { useNavigate } from 'react-router-dom'

const SearchResult = ({ result }) => {
    const navigate = useNavigate();
  return (
      <div
        className="hover:bg-slate-600 text-left indent-5 py-1 first-of-type:bg-slate-500 rounded-xl "
        onClick={() => navigate(`items/${result.id}`)}
      >
        {result.name}
      </div>
  );
}

export default SearchResult
