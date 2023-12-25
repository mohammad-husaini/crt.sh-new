import React from "react";
import "./SearchPage.css";
import SearchBar from "../SearchBar";
const SearchPage = (props) => {
  const { getDataFromSearchBar } = props;
  return (
    <div className="center-div-search-page">
      <div>
        <span className="text-design">CYSTACK</span>
      </div>
      <SearchBar getDataFromSearchBar={getDataFromSearchBar}></SearchBar>
    </div>
  );
};

export default SearchPage;
