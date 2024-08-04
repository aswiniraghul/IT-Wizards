import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({ result }) => {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`items/${result.id}`)}>
      {result.name}
    </div>
  )
}

export default SearchResult
