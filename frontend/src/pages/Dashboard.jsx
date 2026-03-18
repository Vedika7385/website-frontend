import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
    // Live Telemetry States
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
    const [solarP, setSolarP] = useState(12.5);
    const [chgP, setChgP] = useState(18.5);

    const navigate = useNavigate();

    // Chart References
    const predTempChartRef = useRef(null);
    const acousticChartRef = useRef(null);
    const socChartRef = useRef(null);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    useEffect(() => {
        // Clock Update
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
            setSolarP((12.5 + (Math.random() * 0.4 - 0.2)).toFixed(1));
            setChgP((18.5 + (Math.random() * 0.6 - 0.3)).toFixed(1));
        }, 1000);

        // Chart.js Initialization (Using the global 'Chart' from index.html CDN)
        const ctxPred = predTempChartRef.current?.getContext('2d');
        const ctxAcoustic = acousticChartRef.current?.getContext('2d');
        const ctxSoc = socChartRef.current?.getContext('2d');

        let predChart, acousticChart, socChart;

        if (window.Chart) {
            predChart = new window.Chart(ctxPred, {
                type: 'line',
                data: {
                    labels: ['Now', '+10m', '+20m', '+30m', '+40m', '+50m', '+60m'],
                    datasets: [{
                        label: 'Inverter AI Prediction',
                        data: [48.2, 49.1, 51.5, 53.4, 55.0, 56.8, 58.2],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });

            acousticChart = new window.Chart(ctxAcoustic, {
                type: 'line',
                data: {
                    labels: Array.from({ length: 50 }, (_, i) => i),
                    datasets: [{
                        data: Array.from({ length: 50 }, () => Math.random() * 2 - 1),
                        borderColor: '#3b82f6',
                        borderWidth: 1.5,
                        pointRadius: 0
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } }
            });

            socChart = new window.Chart(ctxSoc, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [85, 15],
                        backgroundColor: ['#10b981', '#e2e8f0'],
                        borderWidth: 0,
                        circumference: 270,
                        rotation: 225
                    }]
                },
                options: { cutout: '75%', plugins: { tooltip: { enabled: false } } }
            });
        }

        return () => {
            clearInterval(timer);
            predChart?.destroy();
            acousticChart?.destroy();
            socChart?.destroy();
        };
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="brand">
                    <i className="fas fa-bolt text-accent"></i>
                    <span className="font-bold">EV-STATION AI</span>
                </div>
                <nav className="nav-menu">
                    <div className="nav-item active"><i className="fas fa-th-large"></i> Dashboard</div>
                    <div className="nav-item"><i className="fas fa-chart-line"></i> Analytics</div>
                    <div className="nav-item"><i className="fas fa-shield-alt"></i> Health Check</div>
                    <div className="nav-item mt-auto" onClick={handleLogout} style={{ cursor: 'pointer', color: 'var(--color-red)' }}>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="op-board-container">
                    <header className="topbar">
                        <div className="page-title">
                            <h1>Operational Dashboard</h1>
                            <span className="subtitle">System Status: <span className="text-green">All Systems Nominal</span></span>
                        </div>
                        <div className="flex-row gap-4" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                            <span className="font-mono text-lg">{time}</span>
                            <button className="theme-toggle"><i className="fas fa-sun"></i></button>
                        </div>
                    </header>

                    {/* Dashboard Grid */}
                    <div className="grid-2col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
                        <div className="card">
                            <div className="card-header"><h3><i className="fas fa-temperature-high"></i> Predictive Temperature</h3></div>
                            <div className="p-6" style={{ height: '250px' }}>
                                <canvas ref={predTempChartRef}></canvas>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header"><h3><i className="fas fa-wave-square"></i> Acoustic Analysis</h3></div>
                            <div className="p-6" style={{ height: '250px' }}>
                                <canvas ref={acousticChartRef}></canvas>
                            </div>
                        </div>
                    </div>

                    <div className="grid-4col" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '24px'}}>
                         <div className="panel-sensor-card">
                            <div className="text-muted text-xs">SOLAR GENERATION</div>
                            <div className="temp-val text-accent">{solarP} kW</div>
                         </div>
                         <div className="panel-sensor-card">
                            <div className="text-muted text-xs">CHARGER LOAD</div>
                            <div className="temp-val text-green">{chgP} kW</div>
                         </div>
                         <div className="panel-sensor-card">
                            <div className="text-muted text-xs">BATTERY LEVEL</div>
                            <div className="temp-val text-yellow">85%</div>
                            <div className="soc-bar-container"><div className="soc-bar-fill status-yellow-bg" style={{width: '85%'}}></div></div>
                         </div>
                         <div className="panel-sensor-card">
                            <div className="text-muted text-xs">SYSTEM HEALTH</div>
                            <div className="temp-val text-green">Optimal</div>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
