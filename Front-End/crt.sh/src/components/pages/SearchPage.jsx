import React from "react";
import "./SearchPage.css";
import SearchBar from "../SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchPage = (props) => {
  const { getDataFromSearchBar } = props;
  return (
    <>
      <div className="center-div-search-page">
        <p className="logo-design-sp">CYSTACK</p>
        <SearchBar getDataFromSearchBar={getDataFromSearchBar}></SearchBar>
      </div>
      <ToastContainer />
    </>
  );
};

export default SearchPage;
