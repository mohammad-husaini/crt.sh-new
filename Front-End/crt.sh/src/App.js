import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/pages/SearchPage";
import ResultPage from "./components/pages/ResultPage";
import Logo from "./components/Logo";
import { useState } from "react";
const App = () => {
  const [data, setData] = useState();

  const getDataFromSearchBar = (dataTo) => {
    setData(dataTo);
    console.log(data);
  };
  return (
    <BrowserRouter>
      <Logo />
      <Routes>
        <Route
          index
          path="/"
          element={
            <SearchPage
              getDataFromSearchBar={getDataFromSearchBar}
            ></SearchPage>
          }
        ></Route>
        <Route
          index
          path="/result"
          element={<ResultPage data={data}></ResultPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
