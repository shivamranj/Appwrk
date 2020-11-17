import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import AddTransaction from "./AddTransaction";
import "../styles.css";

const DashBoard = ({ amount, transactions }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div>Balance : {amount}</div>
      <div className="flex">
        <div className="btn" onClick={() => localStorage.clear()}>
          Office Transcations
        </div>
        <div className="btn add" onClick={() => setOpen(true)}>
          {" "}
          + Add Transcations
        </div>
      </div>
      <table>
        <tr>
          {["Date", "Description", "Credit", "Debit", "Running Balance"].map(
            (item) => (
              <th key={item}>{item}</th>
            )
          )}
        </tr>
        {transactions.map((transaction, index) => (
          <tr key={`transaction-${index}`}>
            <td>{moment(transaction.date).format("DD/MM/YYYY")}</td>
            <td>{transaction.description || "-"}</td>
            <td>{transaction.credit || "-"}</td>
            <td>{transaction.debit || "-"}</td>
            <td>{transaction.balance}</td>
          </tr>
        ))}
      </table>
      <AddTransaction open={open} close={() => setOpen(false)} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  amount: state.amount,
  transactions: state.transactions,
});

export default connect(mapStateToProps)(DashBoard);
