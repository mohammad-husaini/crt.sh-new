import React, { useEffect, useState } from "react";
import "./ResultPage.css";
import axios from "axios";
const ResultPage = (props) => {
  const { data } = props;
  const [result, setResult] = useState();
  const getDataFromURL = async (url) => {
    const response = await axios.get(url);
    setResult(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getDataFromURL(`http://localhost:5000?search=${data}`);
  }, [data]);

  return (
    <div className="main">
      <table className="center-table">
        <tr>
          <th>ID</th>
          <th>issuer_name</th>
          <th>Country</th>
        </tr>
        {result?.map((e) => {
          return (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.issuer_name}</td>
              <td>{e.common_name}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ResultPage;
