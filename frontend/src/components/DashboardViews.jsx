import React from 'react';

// --- Solar View ---
export const SolarView = ({ solarP }) => (
    <div className="animate-fade-in">
        <div className="grid-2col mb-6">
            <div className="card">
                <div className="card-header"><h3><i className="fas fa-sun text-yellow"></i> Solar Generation Detail</h3></div>
                <div className="p-6">
                    <div className="flex-between mb-4">
                        <span className="text-muted">Current Output</span>
                        <span className="text-xl font-bold text-accent">{solarP} kW</span>
                    </div>
                    <div className="flex-between mb-4">
                        <span className="text-muted">Daily Peak</span>
                        <span className="text-lg">14.8 kW</span>
                    </div>
                    <div className="flex-between">
                        <span className="text-muted">Efficiency</span>
                        <span className="text-green">94.2%</span>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header"><h3><i className="fas fa-chart-area"></i> Efficiency Trend</h3></div>
                <div className="p-6 flex-center" style={{height: '150px'}}>
                    <p className="text-muted">Solar efficiency is optimal for current weather conditions.</p>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header"><h3><i className="fas fa-project-diagram"></i> Solar Array Status</h3></div>
            <div className="p-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Array ID</th>
                            <th>Status</th>
                            <th>Output</th>
                            <th>Temp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Array A-1</td><td><span className="badge status-green-bg">Active</span></td><td>4.2 kW</td><td>32°C</td></tr>
                        <tr><td>Array A-2</td><td><span className="badge status-green-bg">Active</span></td><td>3.8 kW</td><td>31°C</td></tr>
                        <tr><td>Array B-1</td><td><span className="badge status-yellow-bg">Maintenance</span></td><td>0.0 kW</td><td>24°C</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- Battery View ---
export const BatteryView = () => (
    <div className="animate-fade-in">
        <div className="grid-4col mb-6">
            <div className="panel-sensor-card">
                <div className="text-muted text-xs">STATE OF CHARGE</div>
                <div className="temp-val text-green">85%</div>
            </div>
            <div className="panel-sensor-card">
                <div className="text-muted text-xs">TEMPERATURE</div>
                <div className="temp-val text-yellow">28°C</div>
            </div>
            <div className="panel-sensor-card">
                <div className="text-muted text-xs">VOLTAGE</div>
                <div className="temp-val text-accent">412V</div>
            </div>
            <div className="panel-sensor-card">
                <div className="text-muted text-xs">HEALTH (SOH)</div>
                <div className="temp-val text-green">98%</div>
            </div>
        </div>
        <div className="card">
            <div className="card-header"><h3><i className="fas fa-car-battery"></i> Cell Health Monitor</h3></div>
            <div className="p-6">
                <div className="flex-row gap-2 flex-wrap">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} style={{width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--color-green)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'}}>
                            C-{i+1}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-muted mt-4">* All battery cells are balanced and operating within safe temperature limits.</p>
            </div>
        </div>
    </div>
);

// --- Charger View ---
export const ChargerView = ({ chgP }) => (
    <div className="animate-fade-in">
        <div className="card mb-6">
            <div className="card-header"><h3><i className="fas fa-charging-station"></i> Active Sessions</h3></div>
            <div className="p-6">
                <div className="flex-between items-center mb-6">
                    <div>
                        <div className="text-3xl font-bold">{chgP} kW</div>
                        <div className="text-muted">Total Charging Demand</div>
                    </div>
                    <button className="login-btn" style={{width: 'auto', padding: '10px 20px'}}>Manage Slots</button>
                </div>
                <div className="grid-2col">
                    <div className="panel-sensor-card">
                        <div className="flex-between">
                            <span>Station 01</span>
                            <span className="badge status-green-bg">Fast Charging</span>
                        </div>
                        <div className="mt-2 text-lg font-bold">12.5 kW</div>
                        <div className="text-xs text-muted">Vehicle ID: EV-2024-X</div>
                    </div>
                    <div className="panel-sensor-card">
                        <div className="flex-between">
                            <span>Station 02</span>
                            <span className="badge status-yellow-bg">Idle</span>
                        </div>
                        <div className="mt-2 text-lg font-bold">0.0 kW</div>
                        <div className="text-xs text-muted">Awaiting vehicle connection</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Inverter View --- (Uses predTempChartRef and acousticChartRef from props/refs)
export const InverterView = ({ predTempChartRef, acousticChartRef }) => (
    <div className="animate-fade-in">
        <div className="grid-2col mb-6">
            <div className="card">
                <div className="card-header"><h3><i className="fas fa-microchip"></i> AI Predictive Analysis</h3></div>
                <div className="p-6" style={{ height: '300px' }}>
                    <canvas ref={predTempChartRef}></canvas>
                </div>
            </div>
            <div className="card">
                <div className="card-header"><h3><i className="fas fa-wave-square"></i> Acoustic Noise Profile</h3></div>
                <div className="p-6" style={{ height: '300px' }}>
                    <canvas ref={acousticChartRef}></canvas>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header"><h3><i className="fas fa-stethoscope"></i> Component Health</h3></div>
            <div className="stat-group">
                <span className="label">MOSFET Temperature</span>
                <span className="value text-green">42°C</span>
            </div>
            <div className="stat-group">
                <span className="label">Capacitor Lifecycle</span>
                <span className="value">92% Remaining</span>
            </div>
            <div className="stat-group">
                <span className="label">Switching Frequency</span>
                <span className="value">20.4 kHz</span>
            </div>
        </div>
    </div>
);

// --- Weekly Report View ---
export const ReportView = () => (
    <div className="animate-fade-in">
        <div className="card">
            <div className="card-header flex-between">
                <h3><i className="fas fa-file-invoice"></i> System Performance (Weekly)</h3>
                <button className="weekly-report-btn">Download PDF</button>
            </div>
            <div className="p-6">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Solar Generated</th>
                            <th>Charger Load</th>
                            <th>Max Temp</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Monday</td><td>124 kWh</td><td>156 kWh</td><td>48°C</td><td><span className="text-green">Normal</span></td></tr>
                        <tr><td>Tuesday</td><td>98 kWh</td><td>142 kWh</td><td>51°C</td><td><span className="text-green">Normal</span></td></tr>
                        <tr><td>Wednesday</td><td>112 kWh</td><td>189 kWh</td><td>54°C</td><td><span className="text-yellow">High Load</span></td></tr>
                        <tr><td>Thursday</td><td>135 kWh</td><td>167 kWh</td><td>49°C</td><td><span className="text-green">Normal</span></td></tr>
                        <tr><td>Friday</td><td>105 kWh</td><td>198 kWh</td><td>53°C</td><td><span className="text-green">Normal</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- Emergency View ---
export const EmergencyView = () => (
    <div className="animate-fade-in">
        <div className="card" style={{borderColor: 'var(--color-red)', background: 'rgba(239, 68, 68, 0.05)'}}>
            <div className="card-header" style={{background: 'var(--color-red)', color: 'white'}}>
                <h3 style={{color: 'white'}}><i className="fas fa-exclamation-triangle"></i> EMERGENCY CONTROL CENTER</h3>
            </div>
            <div className="p-6">
                <div className="alert-item status-red-bg mb-6">
                    <i className="fas fa-fire"></i>
                    <span>CRITICAL: High Temp detected in Inverter Module 02 (82°C)</span>
                </div>
                
                <div className="grid-2col gap-6">
                    <button className="login-btn" style={{background: 'var(--color-red)', height: '100px', fontSize: '1.2rem'}}>
                        <i className="fas fa-power-off mb-2"></i><br/>EMERGENCY SHUTDOWN
                    </button>
                    <button className="login-btn" style={{background: 'var(--color-yellow)', height: '100px', fontSize: '1.2rem', color: 'black'}}>
                        <i className="fas fa-fire-extinguisher mb-2"></i><br/>TRIGGER SUPPRESSION
                    </button>
                </div>

                <div className="mt-8">
                    <h4>System Isolation Status</h4>
                    <div className="stat-group">
                        <span className="label">Grid Connection</span>
                        <span className="value text-green">Online</span>
                    </div>
                    <div className="stat-group" style={{borderBottom: 'none'}}>
                        <span className="label">Solar Array isolation</span>
                        <span className="value text-red">Open (Safe)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
