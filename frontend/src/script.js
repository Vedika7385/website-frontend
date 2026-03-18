// Determine styling for Light Theme charts
Chart.defaults.color = '#64748b'; // text-muted
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.scale.grid.color = '#e2e8f0'; // border-color

const colors = {
    cyan: '#06b6d4',
    blue: '#3b82f6',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
    bgCard: '#ffffff'
};

// 1. Clock Update
function updateClock() {
    const clockElement = document.getElementById('system-clock');
    const now = new Date();
    clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// 2. Initialize Charts

// Predictive Temp Chart (Inverter Section)
const ctxPredTemp = document.getElementById('predictiveTempChart').getContext('2d');
const predTempChart = new Chart(ctxPredTemp, {
    type: 'line',
    data: {
        labels: ['Now', '+10m', '+20m', '+30m', '+40m', '+50m', '+60m'],
        datasets: [
            {
                label: 'Inverter AI Prediction',
                data: [48.2, 49.1, 51.5, 53.4, 55.0, 56.8, 58.2],
                borderColor: colors.red,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                borderDash: [5, 5],
                pointBackgroundColor: colors.red,
                pointRadius: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: { beginAtZero: false, min: 40, max: 70 },
            x: { display: true }
        }
    }
});

// Acoustic Waveform Chart (Inverter Section)
const ctxAcoustic = document.getElementById('acousticWaveform').getContext('2d');
let acousticData = Array.from({ length: 50 }, () => Math.random() * 2 - 1);
const acousticChart = new Chart(ctxAcoustic, {
    type: 'line',
    data: {
        labels: Array.from({ length: 50 }, (_, i) => i),
        datasets: [{
            data: acousticData,
            borderColor: colors.blue,
            borderWidth: 1.5,
            tension: 0.2,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false, min: -2, max: 2 },
            x: { display: false }
        }
    }
});

// Battery SOC Gauge (Doughnut)
const ctxSoc = document.getElementById('batterySocGauge').getContext('2d');
const socChart = new Chart(ctxSoc, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [85, 15],
            backgroundColor: [colors.green, '#e2e8f0'], // green and border-color
            borderWidth: 0,
            circumference: 270,
            rotation: 225
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: { tooltip: { enabled: false } }
    }
});


// 3. Simulated Data Updates
function updateRandomData() {
    // Update acoustic waveform to simulate live audio
    const newAcoustic = Array.from({ length: 50 }, () => (Math.random() * 1.5 - 0.75) * (Math.random() > 0.9 ? 2.5 : 1));
    acousticChart.data.datasets[0].data = newAcoustic;
    acousticChart.update();

    // Randomize Solar Data slightly to simulate live telemetry
    const solarP = (12.5 + (Math.random() * 0.4 - 0.2)).toFixed(1);
    document.getElementById('val-solar-p').textContent = solarP;

    // Randomize Charger Data
    const chgP = (18.5 + (Math.random() * 0.6 - 0.3)).toFixed(1);
    document.getElementById('val-chg-p').textContent = chgP;
}

setInterval(updateRandomData, 1000);
