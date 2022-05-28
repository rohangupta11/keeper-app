import React from "react";
import SearchIcon from '@mui/icons-material/Search';
function Search({ handleSearch }) {
  return (
    <div className="search">
    <SearchIcon />
      <input onChange={handleSearch} type="text" placeholder=" Search for a note..." />
    </div>
  );
}
export default Search;
