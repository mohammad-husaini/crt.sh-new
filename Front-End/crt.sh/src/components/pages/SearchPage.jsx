import React from "react";
import "./SearchPage.css";
import SearchBar from "../SearchBar";
const SearchPage = (props) => {
  const { getDataFromSearchBar } = props;
  return (
    <div className="center-div-search-page">
      <p className="logo-design-sp">CYSTACK</p>
      <SearchBar getDataFromSearchBar={getDataFromSearchBar}></SearchBar>
    </div>
  );
};

export default SearchPage;
