import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import CustomerDashboard from "./components/dashboard/CustomerDashboard/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
