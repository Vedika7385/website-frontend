import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call for Demo Credentials
        setTimeout(() => {
            if (email === 'admin@demo.com' && password === 'password123') {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                setError('Invalid email or password. Use admin@demo.com / password123');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-card animate-fade-in">
                <div className="login-brand">
                    <i className="fas fa-bolt"></i>
                    <h2>Welcome Back</h2>
                    <p className="text-muted text-sm">Sign in to your EV-STATION AI account</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="admin@demo.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="password123" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>

                    {error && <div className="text-red text-xs mb-4">{error}</div>}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex-row flex-center gap-2">
                                <div className="spinner"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" className="text-accent font-bold">Sign Up</Link>
                </div>

                <div className="mt-8 p-4 bg-gray rounded-md text-xs text-left">
                    <p className="font-bold mb-1"><i className="fas fa-info-circle mr-2"></i> Demo Credentials:</p>
                    <p>Email: <span className="font-mono">admin@demo.com</span></p>
                    <p>Password: <span className="font-mono">password123</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
