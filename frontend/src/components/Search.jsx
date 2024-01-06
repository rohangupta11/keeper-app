import React from "react";
import SearchIcon from '@mui/icons-material/Search';
function Search({ handleSearch }) {
  return (
    <div className="search">
    <SearchIcon />
      <input onChange={handleSearch} type="text" placeholder=" Search for a note..." />
    </div> //when search text is changed, handleSearch fnc from app is called to update our searchText state
  );
}
export default Search;
