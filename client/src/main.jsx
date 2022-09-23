import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import './index.css';
import App from "./App";
import { store } from "./redux/store";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
  // </React.StrictMode>
);
