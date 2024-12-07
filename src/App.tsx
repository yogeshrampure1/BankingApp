import Login from "./components/auth/Login";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
       
        <Route path="/" element={<Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
