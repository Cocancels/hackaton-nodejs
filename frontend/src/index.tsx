<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Rooms from './Rooms';
>>>>>>> rooms

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
<<<<<<< HEAD
root.render(<App />);
=======
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> rooms
