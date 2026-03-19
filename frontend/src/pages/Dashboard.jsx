import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsAuthenticated }) => {
    const [currentView, setCurrentView] = useState('Operational Dashboard');
    const navigate = useNavigate();

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

        if (window.Chart && ctxThermal && ctxCharging) {
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
                options: { cutout: '70%', plugins: { legend: { display: false } } }
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
                options: { cutout: '70%', plugins: { legend: { display: false } } }
            });
        }

        return () => {
            thermalChart?.destroy();
            chargingChart?.destroy();
        };
    }, [currentView]);

    const sidebarItems = [
        { name: 'Operational Dashboard', icon: 'fa-th-large', status: null },
        { name: 'Solar Monitoring', icon: 'fa-solar-panel', status: 'warning' },
        { name: 'Battery Monitoring', icon: 'fa-car-battery', status: 'critical' },
        { name: 'Charger Monitoring', icon: 'fa-plug-circle-bolt', status: 'normal' },
        { name: 'Inverter Monitoring', icon: 'fa-bolt', status: null },
        { name: 'Vehicle Sessions', icon: 'fa-car', status: null },
        { name: 'Weekly Reports', icon: 'fa-file-lines', status: null },
    ];

    const renderOperationalDashboard = () => (
        <div className="dashboard-content animate-fade-in">
            {/* TOP PRIORITY (Decision Layer) */}
            <div className="grid-2col" style={{ gridTemplateColumns: '1fr 2fr', gap: '24px', marginBottom: '24px' }}>
                <div className="card system-health-card critical-bg">
                    <div className="card-header" style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                        <i className="fas fa-heartbeat" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                        <h3 style={{ fontSize: '1.2rem', color: 'white', margin: 0 }}>System Health Status</h3>
                    </div>
                    <div className="health-content">
                        <div className="health-status">CRITICAL</div>
                        <div className="health-message">3 critical issues detected requiring immediate attention.</div>
                    </div>
                </div>

                <div className="card action-panel-card border-critical">
                    <div className="card-header">
                        <i className="fas fa-exclamation-triangle text-red"></i>
                        <h3 style={{ margin: 0 }}>Critical Actions Panel</h3>
                    </div>
                    <div className="action-list">
                        <div className="action-item">
                            <div className="action-info">
                                <span className="action-badge bg-red">Critical</span>
                                <span className="action-desc">Battery electrolyte level low detected in Unit 3.</span>
                            </div>
                            <button className="btn-action btn-red">Inspect Battery</button>
                        </div>
                        <div className="action-item">
                            <div className="action-info">
                                <span className="action-badge bg-yellow">Warning</span>
                                <span className="action-desc">Solar panels underperforming (Dust &gt; 40%).</span>
                            </div>
                            <button className="btn-action btn-yellow">Clean Panels</button>
                        </div>
                        <div className="action-item">
                            <div className="action-info">
                                <span className="action-badge bg-yellow">Warning</span>
                                <span className="action-desc">Inverter temperature rising (75°C).</span>
                            </div>
                            <button className="btn-action btn-yellow">Enable Cooling</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECOND LAYER (System Understanding) */}
            <div className="grid-2col" style={{ gap: '24px', marginBottom: '24px' }}>
                <div className="card">
                    <div className="card-header">
                        <i className="fas fa-chart-line text-accent"></i>
                        <h3 style={{ margin: 0 }}>Power Flow Analysis</h3>
                    </div>
                    <div className="power-flow-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                        <div className="flow-node">
                            <i className="fas fa-solar-panel"></i>
                            <span className="flow-label">SOLAR</span>
                            <span className="flow-value">44.3 kW</span>
                        </div>
                        <div style={{ flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative' }}></div>
                        <div className="flow-node">
                            <i className="fas fa-bolt"></i>
                            <span className="flow-label">LOSS</span>
                            <span className="flow-value">40.5 kW</span>
                            <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 800 }}>8.5% Eff</span>
                        </div>
                        <div style={{ flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative' }}></div>
                        <div className="flow-node">
                            <i className="fas fa-microchip"></i>
                            <span className="flow-label">INVERTER</span>
                            <span className="flow-value">3.79 kW</span>
                        </div>
                        <div style={{ flex: 1, borderTop: '2px dashed #cbd5e1', margin: '0 10px', position: 'relative' }}></div>
                        <div className="flow-node">
                            <i className="fas fa-charging-station"></i>
                            <span className="flow-label">CHARGER</span>
                            <span className="flow-value">3.6 kW</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <i className="fas fa-brain text-accent"></i>
                        <h3 style={{ margin: 0 }}>Predictive Insights</h3>
                    </div>
                    <div className="insights-list">
                        <div className="insight-item border-yellow">
                            <i className="fas fa-broom text-yellow"></i>
                            <div className="insight-text">Solar cleaning required in</div>
                            <div className="insight-countdown text-yellow bg-yellow-light">2 Days</div>
                        </div>
                        <div className="insight-item border-red">
                            <i className="fas fa-car-battery text-red"></i>
                            <div className="insight-text">Battery degradation critical in</div>
                            <div className="insight-countdown text-red bg-red-light">5 Days</div>
                        </div>
                        <div className="insight-item border-green">
                            <i className="fas fa-charging-station text-green"></i>
                            <div className="insight-text">Charger stability</div>
                            <div className="insight-countdown text-green bg-green-light">Stable</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THIRD LAYER (Monitoring + Breakdown) */}
            <div className="grid-3col" style={{ gap: '24px', marginBottom: '24px' }}>
                {/* Solar */}
                <div className="card">
                    <div className="card-header flex-between" style={{ marginBottom: '16px' }}>
                        <div className="flex-row gap-2">
                            <i className="fas fa-solar-panel text-accent"></i>
                            <h3 style={{ margin: 0 }}>Solar Panels</h3>
                        </div>
                        <span className="text-xs text-red font-bold bg-red-light badge">3 Overheating</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {[
                            { id: '1', temp: '37°', status: 'normal' }, { id: '2', temp: '43°', status: 'warning' },
                            { id: '3', temp: '65°', status: 'critical' }, { id: '4', temp: '41°', status: 'warning' },
                            { id: '5', temp: '47°', status: 'normal' }, { id: '6', temp: '31°', status: 'warning' },
                            { id: '7', temp: '68°', status: 'critical' }, { id: '8', temp: '38°', status: 'normal' },
                            { id: '9', temp: '42°', status: 'warning' }, { id: '10', temp: '44°', status: 'normal' },
                            { id: '11', temp: '62°', status: 'critical' }, { id: '12', temp: '36°', status: 'normal' }
                        ].map(panel => (
                            <div key={panel.id} className={`mini-sensor-box status-${panel.status}`}>
                                <div className="sensor-id">SP{panel.id}</div>
                                <div className="sensor-val">{panel.temp}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Battery */}
                <div className="card">
                    <div className="card-header flex-between" style={{ marginBottom: '16px' }}>
                        <div className="flex-row gap-2">
                            <i className="fas fa-car-battery text-accent"></i>
                            <h3 style={{ margin: 0 }}>Battery Units</h3>
                        </div>
                        <span className="text-xs text-red font-bold bg-red-light badge">Check Req.</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {[
                            { id: '1', soh: '98%', temp: '28°', status: 'normal' }, { id: '2', soh: '95%', temp: '29°', status: 'normal' },
                            { id: '3', soh: '45%', temp: '45°', status: 'critical' }, { id: '4', soh: '92%', temp: '30°', status: 'normal' },
                            { id: '5', soh: '88%', temp: '31°', status: 'warning' }, { id: '6', soh: '91%', temp: '29°', status: 'normal' },
                            { id: '7', soh: '89%', temp: '32°', status: 'warning' }, { id: '8', soh: '94%', temp: '28°', status: 'normal' },
                        ].map(bat => (
                            <div key={bat.id} className={`mini-sensor-box status-${bat.status}`}>
                                <div className="sensor-id">B{bat.id}</div>
                                <div className="sensor-val">{bat.soh}</div>
                                <div className="sensor-sub">{bat.temp}</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-xs text-center mt-3 text-red font-bold">Unit 3 replacement req. in 5 days</div>
                </div>

                {/* Charger */}
                <div className="card">
                    <div className="card-header flex-between" style={{ marginBottom: '16px' }}>
                        <div className="flex-row gap-2">
                            <i className="fas fa-plug-circle-bolt text-accent"></i>
                            <h3 style={{ margin: 0 }}>Chargers</h3>
                        </div>
                        <span className="text-xs text-green font-bold bg-green-light badge">Stable</span>
                    </div>
                    <div className="charger-stats">
                        <div className="stat-row">
                            <span className="text-muted text-sm font-bold">Efficiency</span>
                            <span className="text-green font-bold text-lg">94.2%</span>
                        </div>
                        <div className="stat-row">
                            <span className="text-muted text-sm font-bold">Avg Temperature</span>
                            <span className="text-accent font-bold text-lg">34°C</span>
                        </div>
                        <div className="stat-row">
                            <span className="text-muted text-sm font-bold">Active Sessions</span>
                            <span className="font-bold text-lg">3 / 8</span>
                        </div>
                        <div className="stat-row" style={{ borderBottom: 'none' }}>
                            <span className="text-muted text-sm font-bold">Abnormal Behavior</span>
                            <span className="text-green font-bold text-lg">None</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOW PRIORITY (Analytics) */}
            <div className="grid-2col" style={{ gap: '24px' }}>
                <div className="card" style={{ padding: '16px 24px' }}>
                    <div className="card-header mb-0">
                        <i className="fas fa-chart-pie text-accent"></i>
                        <h3 style={{ margin: 0 }}>Charging Distribution</h3>
                    </div>
                    <div style={{ height: '120px', position: 'relative', marginTop: '12px' }}>
                        <canvas ref={chargingChartRef}></canvas>
                    </div>
                </div>

                <div className="card" style={{ padding: '16px 24px' }}>
                    <div className="card-header mb-0">
                        <i className="fas fa-globe text-accent"></i>
                        <h3 style={{ margin: 0 }}>Thermal Risk Analytics</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '120px', marginTop: '12px' }}>
                        <div style={{ width: '50%', height: '100%' }}>
                            <canvas ref={thermalChartRef}></canvas>
                        </div>
                        <div style={{ width: '50%', paddingLeft: '20px', fontSize: '0.85rem' }}>
                            <div style={{ marginBottom: '8px' }}><i className="fas fa-square mr-2 text-green"></i> Normal: 14</div>
                            <div style={{ marginBottom: '8px' }}><i className="fas fa-square mr-2 text-yellow"></i> Warning: 5</div>
                            <div style={{ marginBottom: '8px' }}><i className="fas fa-square mr-2 text-red"></i> Critical: 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

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
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <div className="nav-item-content flex-row gap-2" style={{alignItems: 'center'}}>
                                <i className={`fas ${item.icon}`} style={{width: '20px', textAlign: 'center'}}></i>
                                <span>{item.name}</span>
                            </div>
                            {item.status && (
                                <div className={`status-dot status-dot-${item.status}`}></div>
                            )}
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
                        <h1>{currentView}</h1>
                        <span className="subtitle">Real-Time Decision Dashboard</span>
                    </div>
                    <div className="user-profile">
                        <div className="user-info">
                            <span className="name">Admin</span>
                            <span className="email">admin@nexcharge.ai</span>
                        </div>
                        <button className="theme-toggle" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e0f2fe', border: 'none', color: '#0ea5e9', cursor: 'pointer' }}>
                            <i className="fas fa-moon"></i>
                        </button>
                        <button onClick={handleLogout} style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </header>

                {currentView === 'Operational Dashboard' ? renderOperationalDashboard() : (
                    <div className="card flex-center" style={{height: '400px'}}>
                        <div className="text-center text-muted">
                            <i className="fas fa-tools text-3xl mb-4"></i>
                            <p>Detailed view for {currentView} is available in specific modules.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
