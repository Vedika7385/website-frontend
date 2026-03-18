import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
    const [currentView, setCurrentView] = useState('Operational Dashboard');
    const navigate = useNavigate();

    // Stats for simulation
    const [solarP, setSolarP] = useState(44.31);
    const [systemLoss, setSystemLoss] = useState(40.52);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    // Chart Refs
    const thermalChartRef = useRef(null);
    const chargingChartRef = useRef(null);

    useEffect(() => {
        const ctxThermal = thermalChartRef.current?.getContext('2d');
        const ctxCharging = chargingChartRef.current?.getContext('2d');
        let thermalChart, chargingChart;

        if (window.Chart) {
            thermalChart = new window.Chart(ctxThermal, {
                type: 'doughnut',
                data: {
                    labels: ['Normal', 'Warning', 'Critical'],
                    datasets: [{
                        data: [14, 5, 3],
                        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                        borderWidth: 0,
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: { legend: { display: false } }
                }
            });

            chargingChart = new window.Chart(ctxCharging, {
                type: 'doughnut',
                data: {
                    labels: ['Active', 'Completed', 'Waiting'],
                    datasets: [{
                        data: [3, 18, 5],
                        backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b'],
                        borderWidth: 0,
                    }]
                },
                options: {
                    cutout: '70%',
                    plugins: { legend: { display: false } }
                }
            });
        }

        return () => {
            thermalChart?.destroy();
            chargingChart?.destroy();
        };
    }, []);

    const sidebarItems = [
        { name: 'Operational Dashboard', icon: 'fa-th-large' },
        { name: 'Solar Monitoring', icon: 'fa-solar-panel' },
        { name: 'Battery Monitoring', icon: 'fa-car-battery' },
        { name: 'Inverter Monitoring', icon: 'fa-bolt' },
        { name: 'Charger Monitoring', icon: 'fa-plug-circle-bolt' },
        { name: 'Vehicle Sessions', icon: 'fa-car' },
        { name: 'Weekly Reports', icon: 'fa-file-lines' },
        { name: 'Owner Notifications', icon: 'fa-bell' },
    ];

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="brand">
                    <i className="fas fa-bolt"></i>
                    <span>NexCharge</span>
                </div>
                <nav className="nav-menu">
                    {sidebarItems.map((item) => (
                        <div 
                            key={item.name}
                            className={`nav-item ${currentView === item.name ? 'active' : ''}`}
                            onClick={() => setCurrentView(item.name)}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <span className="system-secured-badge">SYSTEM SECURED</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="topbar">
                    <div className="page-title">
                        <h1>Operational Dashboard</h1>
                        <span className="subtitle">System-wide real-time status</span>
                    </div>
                    <div className="user-profile">
                        <div className="user-info">
                            <span className="name">Admin</span>
                            <span className="email">admin@nexcharge.ai</span>
                        </div>
                        <button className="theme-toggle" style={{width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', border: 'none', color: '#0ea5e9'}}>
                            <i className="fas fa-moon"></i>
                        </button>
                        <button onClick={handleLogout} style={{width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', border: 'none', color: '#ef4444'}}>
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </header>

                <div className="grid-3col" style={{display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '24px', marginBottom: '24px'}}>
                    {/* Immediate Action Panel */}
                    <div className="card">
                        <div className="card-header">
                            <i className="fas fa-exclamation-triangle" style={{color: '#f59e0b'}}></i>
                            <h3>Immediate Action Panel</h3>
                        </div>
                        <div className="alert-card">
                            <i className="fas fa-broom"></i>
                            <span>Solar panels require cleaning (Dust &gt; 40%).</span>
                        </div>
                        <div className="alert-card">
                            <i className="fas fa-battery-empty"></i>
                            <span>Critical: Battery electrolyte level low detected.</span>
                        </div>
                    </div>

                    {/* Session Summary */}
                    <div className="card">
                        <div className="card-header">
                            <i className="fas fa-car" style={{color: '#0ea5e9'}}></i>
                            <h3>Session Summary</h3>
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <div className="flex-between" style={{padding: '12px 0', borderBottom: '1px solid #f1f5f9'}}>
                                <span className="text-secondary">Active Sessions</span>
                                <span className="font-bold text-lg">3</span>
                            </div>
                            <div className="flex-between" style={{padding: '12px 0', borderBottom: '1px solid #f1f5f9'}}>
                                <span className="text-secondary">Completed Today</span>
                                <span className="font-bold text-lg">18</span>
                            </div>
                            <div className="flex-between" style={{padding: '12px 0'}}>
                                <span className="text-secondary">Waiting Vehicles</span>
                                <span className="font-bold text-lg">5</span>
                            </div>
                        </div>
                    </div>

                    {/* Charging Distribution Chart */}
                    <div className="card">
                        <div className="card-header">
                            <h3 style={{margin: 0}}>CHARGING DISTRIBUTION</h3>
                        </div>
                        <div style={{height: '180px', position: 'relative'}}>
                            <canvas ref={chargingChartRef}></canvas>
                            <div className="chart-legend" style={{display: 'flex', gap: '10px', fontSize: '0.7rem', justifyContent: 'center', marginTop: '10px'}}>
                                <span><i className="fas fa-square" style={{color: '#0ea5e9'}}></i> Active</span>
                                <span><i className="fas fa-square" style={{color: '#10b981'}}></i> Completed</span>
                                <span><i className="fas fa-square" style={{color: '#f59e0b'}}></i> Waiting</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid-2col" style={{display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', marginBottom: '24px'}}>
                    {/* Thermal Risk Health */}
                    <div className="card">
                        <div className="card-header">
                            <i className="fas fa-globe" style={{color: '#0ea5e9'}}></i>
                            <h3>Thermal Risk Health</h3>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', height: '220px'}}>
                            <div style={{width: '60%', height: '100%'}}>
                                <canvas ref={thermalChartRef}></canvas>
                            </div>
                            <div style={{width: '40%', paddingLeft: '20px', fontSize: '0.85rem'}}>
                                <div style={{marginBottom: '8px'}}><i className="fas fa-square mr-2" style={{color: '#10b981'}}></i> Normal: 14</div>
                                <div style={{marginBottom: '8px'}}><i className="fas fa-square mr-2" style={{color: '#f59e0b'}}></i> Warning: 5</div>
                                <div style={{marginBottom: '8px'}}><i className="fas fa-square mr-2" style={{color: '#ef4444'}}></i> Critical: 3</div>
                            </div>
                        </div>
                    </div>

                    {/* Power Flow Analysis */}
                    <div className="card">
                        <div className="card-header">
                            <i className="fas fa-chart-line" style={{color: '#0ea5e9'}}></i>
                            <h3>Power Flow Analysis</h3>
                        </div>
                        <div className="power-flow-container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0'}}>
                            <div className="flow-node">
                                <i className="fas fa-solar-panel"></i>
                                <span className="flow-label">SOLAR GENERATION</span>
                                <span className="flow-value">44.31 kW</span>
                            </div>
                            <div style={{flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative'}}>
                                <i className="fas fa-chevron-right" style={{position: 'absolute', right: '-8px', top: '-7px', color: '#94a3b8', fontSize: '10px'}}></i>
                            </div>
                            <div className="flow-node">
                                <i className="fas fa-bolt"></i>
                                <span className="flow-label">SYSTEM LOSS</span>
                                <span className="flow-value">40.52 kW</span>
                                <span style={{fontSize: '0.65rem', color: '#10b981', fontWeight: 800}}>8.5% Eff</span>
                            </div>
                            <div style={{flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative'}}>
                                <i className="fas fa-chevron-right" style={{position: 'absolute', right: '-8px', top: '-7px', color: '#94a3b8', fontSize: '10px'}}></i>
                            </div>
                             <div className="flow-node">
                                <i className="fas fa-microchip"></i>
                                <span className="flow-label">INVERTER INPUT</span>
                                <span className="flow-value">3.79 kW</span>
                            </div>
                            <div style={{flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative'}}>
                                <i className="fas fa-chevron-right" style={{position: 'absolute', right: '-8px', top: '-7px', color: '#94a3b8', fontSize: '10px'}}></i>
                            </div>
                            <div className="flow-node">
                                <i className="fas fa-charging-station"></i>
                                <span className="flow-label">EV CHARGER</span>
                                <span className="flow-value">3.60 kW</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solar Array Monitoring */}
                <div className="card">
                    <div className="card-header">
                        <i className="fas fa-solar-panel" style={{color: '#0ea5e9'}}></i>
                        <h3>Solar Array Monitoring (12 Panels)</h3>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px'}}>
                        {[
                            { id: 'SP1', val: '37.5°', status: 'green' },
                            { id: 'SP2', val: '43.7°', status: 'orange' },
                            { id: 'SP3', val: '41.5°', status: 'red' },
                            { id: 'SP4', val: '41.9°', status: 'orange' },
                            { id: 'SP5', val: '47.4°', status: 'green' },
                            { id: 'SP6', val: '31.0°', status: 'orange' },
                            { id: 'SP7', val: '40.2°', status: 'red' },
                            { id: 'SP8', val: '38.5°', status: 'green' },
                            { id: 'SP9', val: '42.1°', status: 'orange' },
                            { id: 'SP10', val: '44.5°', status: 'green' },
                            { id: 'SP11', val: '39.8°', status: 'red' },
                            { id: 'SP12', val: '36.5°', status: 'green' },
                        ].map(panel => (
                            <div key={panel.id} className="panel-sensor-card" style={{textAlign: 'center'}}>
                                <div className="flex-between" style={{marginBottom: '10px'}}>
                                    <span style={{fontSize: '0.75rem', fontWeight: 700, color: '#64748b'}}>{panel.id}</span>
                                    <div style={{width: '8px', height: '8px', borderRadius: '50%', background: panel.status === 'green' ? '#10b981' : panel.status === 'orange' ? '#f59e0b' : '#ef4444'}}></div>
                                </div>
                                <div style={{fontSize: '1.2rem', fontWeight: 800}}>{panel.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
