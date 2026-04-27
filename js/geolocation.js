/**
 * KASELA Geolocation Module
 * GPS tracking, location analytics, and positioning services
 * @author KASELA TECH
 * @version 1.0.0
 */

class GeolocationService {
    constructor() {
        this.isTracking = false;
        this.watchId = null;
        this.locations = [];
        this.currentLocation = null;
        this.listeners = [];
        this.trackingSession = {
            startTime: null,
            endTime: null,
            distance: 0,
            maxSpeed: 0,
            avgSpeed: 0,
            locations: []
        };
    }

    /**
     * Check if geolocation is available
     */
    isAvailable() {
        return 'geolocation' in navigator;
    }

    /**
     * Subscribe to location updates
     */
    subscribe(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all subscribers of location changes
     */
    notifyListeners(location) {
        this.listeners.forEach(callback => callback(location));
    }

    /**
     * Get current position once
     */
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!this.isAvailable()) {
                reject(new Error('Geolocation not available'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = this.parsePosition(position);
                    this.currentLocation = location;
                    resolve(location);
                },
                (error) => {
                    reject(this.handleError(error));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    /**
     * Start continuous location tracking
     */
    startTracking() {
        if (!this.isAvailable()) {
            console.error('Geolocation not available');
            return false;
        }

        if (this.isTracking) {
            console.warn('Tracking already in progress');
            return false;
        }

        this.isTracking = true;
        this.trackingSession = {
            startTime: new Date(),
            endTime: null,
            distance: 0,
            maxSpeed: 0,
            avgSpeed: 0,
            locations: []
        };

        this.watchId = navigator.geolocation.watchPosition(
            (position) => this.handlePositionUpdate(position),
            (error) => this.handleError(error),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        return true;
    }

    /**
     * Stop tracking
     */
    stopTracking() {
        if (!this.isTracking || !this.watchId) {
            console.warn('No active tracking');
            return false;
        }

        navigator.geolocation.clearWatch(this.watchId);
        this.isTracking = false;
        this.trackingSession.endTime = new Date();
        this.calculateSessionStats();

        return true;
    }

    /**
     * Handle position update
     */
    handlePositionUpdate(position) {
        const location = this.parsePosition(position);
        this.currentLocation = location;
        this.locations.push(location);
        this.trackingSession.locations.push(location);

        // Calculate distance
        if (this.trackingSession.locations.length > 1) {
            const prevLocation = this.trackingSession.locations[this.trackingSession.locations.length - 2];
            const distance = this.calculateDistance(prevLocation, location);
            this.trackingSession.distance += distance;
        }

        // Update max speed
        if (location.speed !== null && location.speed > this.trackingSession.maxSpeed) {
            this.trackingSession.maxSpeed = location.speed;
        }

        this.notifyListeners(location);
    }

    /**
     * Parse position object from Geolocation API
     */
    parsePosition(position) {
        const coords = position.coords;
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            speed: coords.speed ? coords.speed * 3.6 : null, // Convert m/s to km/h
            timestamp: new Date(position.timestamp),
            displayTime: new Date(position.timestamp).toLocaleTimeString()
        };
    }

    /**
     * Calculate distance between two points using Haversine formula
     */
    calculateDistance(loc1, loc2) {
        const R = 6371; // Earth's radius in km
        const lat1 = this.toRad(loc1.latitude);
        const lat2 = this.toRad(loc2.latitude);
        const deltaLat = this.toRad(loc2.latitude - loc1.latitude);
        const deltaLng = this.toRad(loc2.longitude - loc1.longitude);

        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                  Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    /**
     * Convert degrees to radians
     */
    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Calculate session statistics
     */
    calculateSessionStats() {
        if (this.trackingSession.locations.length === 0) return;

        const duration = (this.trackingSession.endTime - this.trackingSession.startTime) / 3600000; // hours
        this.trackingSession.avgSpeed = duration > 0 ? this.trackingSession.distance / duration : 0;
    }

    /**
     * Handle geolocation errors
     */
    handleError(error) {
        let message = 'Unknown error';

        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'Permission denied. Please enable location access.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Position unavailable. GPS signal not found.';
                break;
            case error.TIMEOUT:
                message = 'Location request timeout.';
                break;
        }

        console.error('Geolocation Error:', message);
        return new Error(message);
    }

    /**
     * Get all tracked locations
     */
    getLocations() {
        return this.locations;
    }

    /**
     * Get tracking session data
     */
    getSessionData() {
        return {
            ...this.trackingSession,
            duration: this.trackingSession.endTime
                ? (this.trackingSession.endTime - this.trackingSession.startTime) / 1000 / 60 // minutes
                : 0
        };
    }

    /**
     * Clear all locations
     */
    clearLocations() {
        this.locations = [];
        this.trackingSession.locations = [];
        this.trackingSession.distance = 0;
        this.trackingSession.maxSpeed = 0;
        this.trackingSession.avgSpeed = 0;
    }

    /**
     * Export tracking data as JSON
     */
    exportData() {
        return JSON.stringify(this.getSessionData(), null, 2);
    }
}

// Create global instance
const geolocationService = new GeolocationService();