import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import './index.css';
import App from "./App";
import { store } from "./redux/store";
import axios from 'axios';

axios.defaults.baseURL =	import.meta.env.VITE_APP_API || 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
      <App />
  </Provider>
  // </React.StrictMode>
);
