import React, { useState } from "react";
import "./EmailBox.css";
import axios from "axios";

const EmailBox = () => {
  const [email, setEmail] = useState("");
  const [notificationPeriod, setNotificationPeriod] = useState(30);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://your-backend-url/api/subscribe",
        {
          email,
          notificationPeriod,
        }
      );

      console.log("Subscription successful:", response.data);
    } catch (error) {
      console.error("Error subscribing:", error.message);
    }
  };

  return (
    <div className="info-box">
      <div className="container">
        <h1>Email Subscription Form</h1>
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notificationPeriod">Notification Period</label>
            <select
              id="notificationPeriod"
              value={notificationPeriod}
              onChange={(e) => setNotificationPeriod(Number(e.target.value))}
              required
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
            </select>
          </div>

          <button className="button" type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailBox;
