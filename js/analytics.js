/**
 * KASELA Analytics Module
 * Data analysis and visualization
 * @author KASELA TECH
 * @version 1.0.0
 */

class AnalyticsService {
    constructor() {
        this.charts = {};
        this.initCharts();
    }

    /**
     * Initialize chart instances
     */
    initCharts() {
        // Heatmap Chart
        const heatmapCtx = document.getElementById('heatmapChart')?.getContext('2d');
        if (heatmapCtx) {
            this.charts.heatmap = new Chart(heatmapCtx, {
                type: 'bubble',
                data: {
                    datasets: []
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false }
                    },
                    scales: {
                        x: { title: { display: true, text: 'Longitude' } },
                        y: { title: { display: true, text: 'Latitude' } }
                    }
                }
            });
        }

        // Speed Chart
        const speedCtx = document.getElementById('speedChart')?.getContext('2d');
        if (speedCtx) {
            this.charts.speed = new Chart(speedCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Speed (km/h)',
                        data: [],
                        borderColor: '#007AFF',
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                        tension: 0.1,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Speed (km/h)' }
                        }
                    }
                }
            });
        }

        // Accuracy Chart
        const accuracyCtx = document.getElementById('accuracyChart')?.getContext('2d');
        if (accuracyCtx) {
            this.charts.accuracy = new Chart(accuracyCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Accuracy (meters)',
                        data: [],
                        backgroundColor: '#34C759'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    }

    /**
     * Update speed chart
     */
    updateSpeedChart(locations) {
        if (!this.charts.speed) return;

        const labels = locations.map((_, i) => `${i}`);
        const speeds = locations.map(loc => loc.speed || 0);

        this.charts.speed.data.labels = labels;
        this.charts.speed.data.datasets[0].data = speeds;
        this.charts.speed.update();
    }

    /**
     * Update accuracy chart
     */
    updateAccuracyChart(locations) {
        if (!this.charts.accuracy) return;

        const labels = locations.map((_, i) => `${i}`);
        const accuracies = locations.map(loc => loc.accuracy);

        this.charts.accuracy.data.labels = labels;
        this.charts.accuracy.data.datasets[0].data = accuracies;
        this.charts.accuracy.update();
    }

    /**
     * Update heatmap chart
     */
    updateHeatmap(locations) {
        if (!this.charts.heatmap) return;

        const dataset = locations.map(loc => ({
            x: loc.longitude,
            y: loc.latitude,
            r: 5
        }));

        this.charts.heatmap.data.datasets = [{
            label: 'Location Points',
            data: dataset,
            backgroundColor: 'rgba(0, 122, 255, 0.5)'
        }];
        this.charts.heatmap.update();
    }

    /**
     * Calculate statistics
     */
    calculateStats(locations) {
        if (locations.length === 0) return null;

        const speeds = locations.map(l => l.speed).filter(s => s !== null);
        const accuracies = locations.map(l => l.accuracy);

        return {
            totalLocations: locations.length,
            avgSpeed: speeds.length > 0 ? (speeds.reduce((a, b) => a + b, 0) / speeds.length).toFixed(2) : 0,
            maxSpeed: speeds.length > 0 ? Math.max(...speeds).toFixed(2) : 0,
            minSpeed: speeds.length > 0 ? Math.min(...speeds).toFixed(2) : 0,
            avgAccuracy: (accuracies.reduce((a, b) => a + b, 0) / accuracies.length).toFixed(2),
            bestAccuracy: Math.min(...accuracies).toFixed(2),
            worstAccuracy: Math.max(...accuracies).toFixed(2)
        };
    }
}

// Global analytics instance
const analyticsService = new AnalyticsService();