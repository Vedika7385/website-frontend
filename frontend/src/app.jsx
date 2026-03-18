import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route 
                    path="/login" 
                    element={<Login setIsAuthenticated={setIsAuthenticated} />} 
                />
                <Route path="/signup" element={<Signup />} />

                {/* Dashboard (Protected Route) */}
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} 
                />

                {/* Redirect / to dashboard if authenticated, else to login */}
                <Route 
                    path="/" 
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
                />

                {/* Catch-all for unknown routes */}
                <Route 
                    path="*" 
                    element={<Navigate to="/" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
