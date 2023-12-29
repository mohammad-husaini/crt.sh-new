import React, { useState } from "react";
import "./EmailBox.css";
import { CSVLink } from "react-csv";
import axios from "axios";
import { toast } from "react-toastify";

const EmailBox = (props) => {
  const { name, toggle, result } = props;
  const [email, setEmail] = useState("");
  const [notificationPeriod, setNotificationPeriod] = useState(30);

  const showToastMessage = (toastyMessage) => {
    toast.info(toastyMessage, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      let method = "";
      e.target.value === "subscribe" ? (method = "post") : (method = "delete");
      const response = await axios[`${method}`](
        `http://localhost:5000/subscribe/?search=${name}&exclude=expired`,
        {
          email,
          notificationPeriod,
        }
      );

      if (email) {
        showToastMessage(response.data);
      }
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error.message);
    }
  };

  return (
    <div className={`info-box ${toggle ? "menu-info-box" : ""}`}>
      <div className="container">
        <h1>Email Subscription Form</h1>
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label className="label" htmlFor="email">
              Email address
            </label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="notificationPeriod">
              Notification Period
            </label>
            <select
              className="select"
              id="notificationPeriod"
              value={notificationPeriod}
              onChange={(e) => setNotificationPeriod(Number(e.target.value))}
              required
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
            </select>
          </div>

          <div>
            <button
              className="button"
              type="submit"
              value="subscribe"
              onClick={handleOnClick}
            >
              Subscribe
            </button>
            <button
              className="button-red"
              type="submit"
              value="unsubscribe"
              onClick={handleOnClick}
            >
              UnSubscribe
            </button>
          </div>
        </form>
      </div>
      <CSVLink filename="Certificate information" data={result?.data || []}>
        <button className="download-button">Download Table</button>
      </CSVLink>
    </div>
  );
};

export default EmailBox;
