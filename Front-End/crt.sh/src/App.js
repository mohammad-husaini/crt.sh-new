import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ResultPage from "./pages/ResultPage";
import Logo from "./components/Logo";
const App = () => {
  return (
    <BrowserRouter>
      <Logo />
      <Routes>
        <Route index path="/" element={<SearchPage></SearchPage>}></Route>
        <Route
          index
          path={`/result`}
          element={<ResultPage></ResultPage>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
