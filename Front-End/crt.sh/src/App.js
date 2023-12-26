import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./components/pages/SearchPage";
import ResultPage from "./components/pages/ResultPage";
import Logo from "./components/Logo";
const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <Routes>
        <Route index path="/" element={<SearchPage></SearchPage>}></Route>
        <Route
          index
          path={`/result/:name`}
          element={<ResultPage></ResultPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
