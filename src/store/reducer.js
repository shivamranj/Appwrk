const getInitialState = () => {
  if (localStorage.getItem("history")) {
    return JSON.parse(localStorage.getItem("history"));
  }
  return { amount: 5000, transactions: [] };
};
const initialState = {
  ...getInitialState(),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      localStorage.setItem(
        "history",
        JSON.stringify({
          amount: action.payload.balance,
          transactions: [...state.transactions, action.payload],
        })
      );
      return {
        amount: action.payload.balance,
        transactions: [...state.transactions, action.payload],
      };
    }
    default:
      return state;
  }
};
