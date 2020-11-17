import React, { useState } from "react";
import { connect } from "react-redux";
import "../styles.css";

const AddTransaction = ({ open, close, add, amount }) => {
  const [data, setData] = useState({
    description: "",
    amount: 0,
    type: "credit",
  });
  const [disable, setDisable] = useState(true);
  React.useEffect(
    () =>
      setDisable(
        !(data.type === "credit" || (data.amount > 0 && data.amount <= amount))
      ),
    [data]
  );

  const getBalance = () => {
    return data.type === "credit"
      ? parseInt(amount) + parseInt(data.amount)
      : parseInt(amount) - parseInt(data.amount);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className={open ? "modal open" : "modal"} onClick={close}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>Add Transcation</div>
          <div onClick={close} style={{ cursor: "pointer" }}>
            X
          </div>
        </div>
        <div className="modal-body">
          <table className="modal-table">
            <tr>
              <td>Transaction Type</td>
              <td>
                <select name="type" value={data.type} onChange={handleChange}>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <div className="modal-footer">
          <div
            className={disable ? "btn disable" : "btn ok"}
            onClick={() => {
              add({
                description: data.description,
                [data.type]: parseInt(data.amount),
                date: Date(),
                balance: getBalance(),
              });
              setData({
                description: "",
                amount: 0,
                type: "credit",
              });
              setDisable(true);
              close();
            }}
          >
            Save
          </div>
          <div className="btn cancel" onClick={close}>
            cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({ amount: state.amount });
const mapDispatch = (dispatch) => ({
  add: (data) => dispatch({ type: "ADD_TRANSACTION", payload: data }),
});
export default connect(mapState, mapDispatch)(AddTransaction);
