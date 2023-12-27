import React from "react";
import "./TableForm.css";
const TableForm = (props) => {
  const { data } = props;
  return (
    <table>
      <thead>
        <tr className="fixed-tr">
          <th>ID</th>
          <th> Logged At </th>
          <th> Not Before </th>
          <th> Not After </th>
          <th> Common Name </th>
          <th> Matching Identities </th>
          <th> Issuer Name </th>
        </tr>
      </thead>
      <tbody className="center-table">
        {data?.data?.map((e) => {
          return (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.entry_timestamp}</td>
              <td>{e.not_before}</td>
              <td>{e.not_after}</td>
              <td>{e.common_name}</td>
              <td>{e.name_value}</td>
              <td>{e.issuer_name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableForm;
