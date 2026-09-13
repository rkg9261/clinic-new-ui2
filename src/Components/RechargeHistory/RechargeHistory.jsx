import React, { useEffect, useState } from "react";
import "./RechargeHistory.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RechargeHistory() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory([
      {
        date: "04/07/2026",
        package: "Standard 20 Sessions - ₹4000",
        additionalSessions: 2,
        totalAmount: 4000,
        amountPaid: 3500,
      },
      {
        date: "05/07/2026",
        package: "Advance 5 Sessions - ₹1575",
        additionalSessions: 0,
        totalAmount: 1575,
        amountPaid: 1575,
      },
      {
        date: "06/07/2026",
        package: "Home Physiotherapy 5 Sessions - ₹3000",
        additionalSessions: 1,
        totalAmount: 3000,
        amountPaid: 2500,
      },
      {
        date: "07/07/2026",
        package: "Customized Exercise Plan - ₹4500",
        additionalSessions: 0,
        totalAmount: 4500,
        amountPaid: 4500,
      },
      {
        date: "08/07/2026",
        package: "Standard 5 Sessions - ₹1125",
        additionalSessions: 3,
        totalAmount: 1125,
        amountPaid: 1000,
      },
    ]);
  }, []);

  return (
    <div className="recharge-history-container-recharge-history">

      <div className="history-header-recharge-history">

        <button
          className="back-btn-history-recharge-history"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>

        <h2>Recharge History</h2>

      </div>

      {history.length === 0 ? (
        <p className="no-data-recharge-history">
          No Recharge History Found
        </p>
      ) : (
        <div className="table-wrapper-recharge-history">

          <table className="history-table-recharge-history">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Package</th>
                <th>Additional Sessions</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Balance</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item, index) => (
                <tr key={index}>

                  <td>{index + 1}</td>

                  <td>{item.date}</td>

                  <td>{item.package}</td>

                  <td>{item.additionalSessions}</td>

                  <td>₹{item.totalAmount}</td>

                  <td>₹{item.amountPaid}</td>

                  <td>
                    ₹{item.totalAmount - item.amountPaid}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}