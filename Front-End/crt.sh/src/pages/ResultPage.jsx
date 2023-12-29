import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResultPage.css";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import TableForm from "../components/TableForm";
import EmailBox from "../components/EmailBox";
import NotFound from "../components/NotFound";

import { ToastContainer } from "react-toastify";
import MenuIcon from "../components/MenuIcon";
const ResultPage = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const name = searchParams.get("q");
  const expired = searchParams.get("exclude");
  const getDataFromURL = async (url) => {
    try {
      const response = await axios.get(url);
      setResult(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getToggle = (tog) => {
    setToggle(tog);
  };
  useEffect(() => {
    getDataFromURL(
      `http://localhost:5000/data?search=${name}&exclude=${expired}`
    );
  }, [name]);

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }
  const table = result?.data?.length ? (
    <div className="main">
      <EmailBox toggle={toggle} result={result} name={name}></EmailBox>
      <TableForm data={result}></TableForm>
      <ToastContainer limit={1} />
    </div>
  ) : (
    result?.status === 200 && <NotFound></NotFound>
  );

  return (
    <>
      <MenuIcon getToggle={getToggle}></MenuIcon>
      {table}
    </>
  );
};

export default ResultPage;
