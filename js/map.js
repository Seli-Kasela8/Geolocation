/**
 * KASELA Map Module
 * Real-time location visualization using Leaflet
 * @author KASELA TECH
 * @version 1.0.0
 */

class MapService {
    constructor(containerId) {
        this.containerId = containerId;
        this.map = null;
        this.markers = [];
        this.polyline = null;
        this.heatmapLayer = null;
        this.initMap();
    }

    /**
     * Initialize Leaflet map
     */
    initMap() {
        this.map = L.map(this.containerId).setView([0, 0], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);
    }

    /**
     * Add location marker to map
     */
    addMarker(location, options = {}) {
        const marker = L.marker([location.latitude, location.longitude], {
            title: `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
        }).addTo(this.map);

        const popupContent = `
            <div class="marker-popup">
                <strong>Location</strong><br>
                Lat: ${location.latitude.toFixed(6)}<br>
                Lng: ${location.longitude.toFixed(6)}<br>
                Accuracy: ${location.accuracy.toFixed(2)}m<br>
                Time: ${location.displayTime}
            </div>
        `;

        marker.bindPopup(popupContent);
        this.markers.push(marker);

        return marker;
    }

    /**
     * Draw polyline connecting locations
     */
    updatePolyline(locations) {
        if (locations.length < 2) return;

        const latLngs = locations.map(loc => [loc.latitude, loc.longitude]);

        if (this.polyline) {
            this.map.removeLayer(this.polyline);
        }

        this.polyline = L.polyline(latLngs, {
            color: '#007AFF',
            weight: 3,
            opacity: 0.7,
            smoothFactor: 1
        }).addTo(this.map);

        // Fit map to bounds
        if (latLngs.length > 0) {
            this.map.fitBounds(this.polyline.getBounds(), { padding: [50, 50] });
        }
    }

    /**
     * Add current location marker with icon
     */
    addCurrentLocationMarker(location) {
        const marker = L.marker([location.latitude, location.longitude], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }),
            title: 'Current Location'
        }).addTo(this.map);

        marker.bindPopup('📍 Current Location');
        return marker;
    }

    /**
     * Pan map to location
     */
    panToLocation(location) {
        this.map.panTo([location.latitude, location.longitude]);
    }

    /**
     * Clear all markers
     */
    clearMarkers() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        if (this.polyline) {
            this.map.removeLayer(this.polyline);
            this.polyline = null;
        }
    }

    /**
     * Set map zoom level
     */
    setZoom(level) {
        this.map.setZoom(level);
    }

    /**
     * Get current map bounds
     */
    getBounds() {
        return this.map.getBounds();
    }

    /**
     * Add circle to show accuracy radius
     */
    addAccuracyCircle(location) {
        const circle = L.circle([location.latitude, location.longitude], {
            radius: location.accuracy,
            color: '#5AC8FA',
            fillColor: '#5AC8FA',
            fillOpacity: 0.1,
            weight: 2
        }).addTo(this.map);

        return circle;
    }
}

// Global map instance
let mapService = null;