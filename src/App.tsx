import React, { useState } from 'react';
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/header/Header"
import "./App.css";



function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(true);
  return (
    <Router>
    <Routes>
    {/* <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} /> */}
      <Route path="/login" element={<Login  />} />
      <Route path="/" element={<Login  />} />
    
      <Route
        path="/dashboard"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <Header userName='Sundar'/>
          </PrivateRoute>
        }
      />
       <Route
        path="/fundtransfer"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            'fundtransfer'
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;
