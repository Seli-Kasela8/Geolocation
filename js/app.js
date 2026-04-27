/**
 * KASELA Geolocation Application
 * Main application controller
 * @author KASELA TECH
 * @version 1.0.0
 */

class GeolocationApp {
    constructor() {
        this.isTracking = false;
        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        this.setupEventListeners();
        this.setupGeolocationListeners();
        this.setupMapService();
        this.updateDashboard();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
        });

        // Map controls
        const startBtn = document.getElementById('startTracking');
        const stopBtn = document.getElementById('stopTracking');
        const clearBtn = document.getElementById('clearMap');

        if (startBtn) startBtn.addEventListener('click', () => this.startTracking());
        if (stopBtn) stopBtn.addEventListener('click', () => this.stopTracking());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearMap());

        // Check geolocation availability
        if (!geolocationService.isAvailable()) {
            this.showNotification('Geolocation not available in your browser', 'error');
        }
    }

    /**
     * Setup geolocation listeners
     */
    setupGeolocationListeners() {
        geolocationService.subscribe((location) => {
            this.handleLocationUpdate(location);
        });
    }

    /**
     * Setup map service
     */
    setupMapService() {
        mapService = new MapService('mapContainer');
    }

    /**
     * Switch between sections
     */
    switchSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Update nav button state
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });

        // Invalidate map if switching to map section
        if (sectionId === 'map' && mapService) {
            setTimeout(() => mapService.map.invalidateSize(), 100);
        }
    }

    /**
     * Start tracking
     */
    startTracking() {
        if (!geolocationService.isAvailable()) {
            this.showNotification('Geolocation not available', 'error');
            return;
        }

        const success = geolocationService.startTracking();
        if (success) {
            this.isTracking = true;
            this.showNotification('📍 Tracking started', 'success');
            document.getElementById('startTracking').disabled = true;
            document.getElementById('stopTracking').disabled = false;
        }
    }

    /**
     * Stop tracking
     */
    stopTracking() {
        const success = geolocationService.stopTracking();
        if (success) {
            this.isTracking = false;
            this.showNotification('⏹️ Tracking stopped', 'info');
            document.getElementById('startTracking').disabled = false;
            document.getElementById('stopTracking').disabled = true;
            this.updateDashboard();
        }
    }

    /**
     * Clear map and data
     */
    clearMap() {
        if (this.isTracking) {
            this.showNotification('Stop tracking before clearing', 'warning');
            return;
        }

        geolocationService.clearLocations();
        mapService.clearMarkers();
        this.updateDashboard();
        this.showNotification('Map cleared', 'info');
    }

    /**
     * Handle location update
     */
    handleLocationUpdate(location) {
        // Update tracking info
        this.updateTrackingInfo(location);

        // Add to map
        if (mapService) {
            if (geolocationService.locations.length === 1) {
                mapService.addCurrentLocationMarker(location);
            }
            mapService.addAccuracyCircle(location);
            mapService.updatePolyline(geolocationService.locations);
        }

        // Add to activity log
        this.addActivityItem(location);

        // Update analytics
        analyticsService.updateSpeedChart(geolocationService.locations);
        analyticsService.updateAccuracyChart(geolocationService.locations);
    }

    /**
     * Update tracking info display
     */
    updateTrackingInfo(location) {
        document.getElementById('currentLat').textContent = location.latitude.toFixed(6);
        document.getElementById('currentLng').textContent = location.longitude.toFixed(6);
        document.getElementById('currentAccuracy').textContent = `${location.accuracy.toFixed(2)} m`;
        document.getElementById('currentAltitude').textContent = location.altitude ? `${location.altitude.toFixed(2)} m` : '--';
        document.getElementById('currentSpeed').textContent = location.speed ? `${location.speed.toFixed(2)} km/h` : '-- km/h';
        document.getElementById('currentHeading').textContent = location.heading ? `${location.heading.toFixed(0)} °` : '-- °';
    }

    /**
     * Add activity log item
     */
    addActivityItem(location) {
        const activityLog = document.getElementById('activityLog');
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div>
                <strong>📍 ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}</strong>
                <br>
                <small>Accuracy: ${location.accuracy.toFixed(2)}m</small>
            </div>
            <div class="time">${location.displayTime}</div>
        `;
        activityLog.insertBefore(item, activityLog.firstChild);

        // Keep only last 10 items
        while (activityLog.children.length > 10) {
            activityLog.removeChild(activityLog.lastChild);
        }
    }

    /**
     * Update dashboard stats
     */
    updateDashboard() {
        const locations = geolocationService.getLocations();
        const sessionData = geolocationService.getSessionData();
        const stats = analyticsService.calculateStats(locations);

        document.getElementById('activeLocations').textContent = locations.length;
        document.getElementById('totalDistance').textContent = `${sessionData.distance.toFixed(2)} km`;
        document.getElementById('avgSpeed').textContent = stats ? `${stats.avgSpeed} km/h` : '0 km/h';
        document.getElementById('sessions').textContent = geolocationService.isTracking ? '1' : '0';
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // You can implement toast notifications here
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new GeolocationApp();
    });
} else {
    window.app = new GeolocationApp();
}