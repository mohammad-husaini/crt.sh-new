import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ResultPage.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen";
import TableForm from "../TableForm";
import EmailBox from "../EmailBox";
const ResultPage = () => {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

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
    getDataFromURL(`http://localhost:5000?search=${name}`);
  }, [name]);

  if (loading) {
    return (
      <div className="main">
        <EmailBox></EmailBox>
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
  const table = result?.data?.length ? (
    <>
      <TableForm data={result}></TableForm>
    </>
  ) : (
    result?.status === 200 && <div>Not Found</div>
  );

  return (
    <div className="main">
      <EmailBox></EmailBox>
      <div className="table">{table}</div>
    </div>
  );
};

export default ResultPage;
