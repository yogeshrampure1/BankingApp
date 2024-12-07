import Login from "./components/auth/Login";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustsomerDashboard from "./components/dashboard/CustomerDashboard";
//test
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        {user?.role === "customer" && (
          <Route path="customer-dashboard" element={<CustsomerDashboard />} />
        )}
        <Route path="/" element={<Login />} />
      </Routes>
      <Login />
    </BrowserRouter>
  );
}

export default App;
