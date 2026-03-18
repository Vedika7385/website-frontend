import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="container">
            <h1>EV Charging Monitoring - Live</h1>
            <p>System Clock: {time}</p>
            {/* The rest of the dashboard components will go here */}
        </div>
    );
};

export default App;
