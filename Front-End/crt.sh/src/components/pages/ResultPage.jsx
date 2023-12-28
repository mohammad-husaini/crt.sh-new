import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ResultPage.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";
import TableForm from "../TableForm";
import EmailBox from "../EmailBox";
import NotFound from "../NotFound";
import { CSVLink } from "react-csv";
import { ToastContainer } from "react-toastify";
const ResultPage = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

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
      <EmailBox name={name}></EmailBox>
      <CSVLink filename="Certificate information" data={result?.data || []}>
        <button className="download-button">Download Table</button>
      </CSVLink>
      <TableForm data={result}></TableForm>
      <ToastContainer limit={1} />
    </div>
  ) : (
    result?.status === 200 && <NotFound></NotFound>
  );

  return <div className="table">{table}</div>;
};

export default ResultPage;
