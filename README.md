<h1 align="center">🌍 KASELA Geolocation Intelligence</h1>

<h3 align="center">
  Live GPS Analytics & Location-Based Services for Tourism Operations
</h3>

<p align="center">
  <a href="#features">Features</a> • 
  <a href="#quick-start">Quick Start</a> • 
  <a href="#documentation">Documentation</a> • 
  <a href="#api">API</a> • 
  <a href="#about">About</a>
</p>

---

## 🎯 Overview

**KASELA Geolocation Intelligence** is an enterprise-grade geolocation tracking and analytics system designed specifically for tourism operations. Built with modern web technologies, it provides real-time GPS tracking, location mapping, and comprehensive analytics for location-based services.

Developed by **KASELA TECH** as part of the **KASELA™ GLOBAL GROUP** ecosystem, this tool powers location intelligence for tourism brands, surf operations, and travel experiences across Bali and beyond.

---

## ✨ Features

### 📍 Real-Time GPS Tracking
- Continuous location monitoring with high accuracy
- Real-time position updates and movement tracking
- Altitude and heading information
- Speed calculation and monitoring

### 🗺️ Interactive Mapping
- Live location visualization on interactive maps (Leaflet)
- GPS accuracy visualization with confidence circles
- Polyline tracking showing travel routes
- Marker clustering and map controls

### 📊 Advanced Analytics
- Speed distribution analysis
- Accuracy metrics tracking
- Distance calculations (Haversine formula)
- Session statistics and reporting
- Historical data analysis

### 📈 Dashboard & Visualization
- Real-time statistics dashboard
- Activity logging and timeline
- Chart.js powered data visualization
- Performance metrics tracking

### 🔧 Developer-Friendly
- Modular JavaScript architecture
- RESTful service design
- Event-driven updates
- Export functionality for tracking data

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser with Geolocation API support
- HTTPS connection (required for location access)
- JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Seli-Kasela8/Geolocation.git
   cd Geolocation
   ```

2. **Start local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js
   npx http-server
   ```

3. **Open in browser**
   ```
   https://localhost:8000
   ```

4. **Grant location permission** when prompted

---

## 📖 Documentation

### Core Modules

#### 1. **GeolocationService** (`js/geolocation.js`)
Manages GPS tracking and position data collection.

```javascript
// Get current position
const location = await geolocationService.getCurrentPosition();

// Start tracking
geolocationService.startTracking();

// Subscribe to location updates
geolocationService.subscribe((location) => {
    console.log('New location:', location);
});

// Stop tracking
geolocationService.stopTracking();

// Get all locations
const locations = geolocationService.getLocations();

// Get session data
const session = geolocationService.getSessionData();
```

#### 2. **MapService** (`js/map.js`)
Handles interactive mapping and visualization.

```javascript
// Initialize map
const mapService = new MapService('mapContainerId');

// Add marker
mapService.addMarker(location);

// Draw tracking line
mapService.updatePolyline(locations);

// Pan to location
mapService.panToLocation(location);

// Clear all markers
mapService.clearMarkers();
```

#### 3. **AnalyticsService** (`js/analytics.js`)
Provides data analysis and chart visualization.

```javascript
// Calculate statistics
const stats = analyticsService.calculateStats(locations);

// Update speed chart
analyticsService.updateSpeedChart(locations);

// Update accuracy chart
analyticsService.updateAccuracyChart(locations);

// Update heatmap
analyticsService.updateHeatmap(locations);
```

---

## 🔌 API Reference

### GeolocationService API

#### Methods

| Method | Description | Returns |
|--------|-------------|----------|
| `isAvailable()` | Check if geolocation is supported | `boolean` |
| `getCurrentPosition()` | Get current GPS position | `Promise<Location>` |
| `startTracking()` | Begin continuous tracking | `boolean` |
| `stopTracking()` | End tracking session | `boolean` |
| `getLocations()` | Get all tracked locations | `Location[]` |
| `getSessionData()` | Get tracking session stats | `SessionData` |
| `clearLocations()` | Clear all location data | `void` |
| `subscribe(callback)` | Subscribe to location updates | `void` |
| `exportData()` | Export session as JSON | `string` |

#### Location Object

```typescript
interface Location {
    latitude: number;           // Decimal degrees
    longitude: number;          // Decimal degrees
    accuracy: number;           // Meters
    altitude?: number;          // Meters
    altitudeAccuracy?: number;   // Meters
    heading?: number;           // Degrees 0-360
    speed?: number;             // km/h (converted from m/s)
    timestamp: Date;            // Date object
    displayTime: string;        // Formatted time string
}
```

#### SessionData Object

```typescript
interface SessionData {
    startTime: Date;            // Session start
    endTime: Date;              // Session end
    distance: number;           // Total distance in km
    maxSpeed: number;           // Maximum speed in km/h
    avgSpeed: number;           // Average speed in km/h
    duration: number;           // Duration in minutes
    locations: Location[];       // Array of all locations
}
```

---

## 💡 Use Cases

### Tourism Operations
- **Surf Trip Tracking** - Monitor guide locations and groups
- **Tour Route Analytics** - Analyze traveled routes and patterns
- **Guest Movement** - Track guest locations during activities
- **Safety Monitoring** - Real-time location awareness for groups

### Data Analysis
- **Performance Metrics** - Analyze speed and movement patterns
- **Route Optimization** - Identify efficient paths
- **Historical Analysis** - Review past activities and patterns
- **Reporting** - Generate location-based reports

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Mapping**: Leaflet.js (Open-source mapping library)
- **Charts**: Chart.js (Data visualization)
- **API**: Geolocation API (W3C standard)
- **License**: GPL 2.0

---

## 🔒 Privacy & Security

- Location data stays on user's device
- HTTPS required for secure transmission
- User must explicitly grant location permission
- No tracking without user consent
- Data can be exported or cleared at any time

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 50+ | ✅ Supported |
| Firefox | 45+ | ✅ Supported |
| Safari | 10+ | ✅ Supported |
| Edge | 15+ | ✅ Supported |
| IE | 11 | ⚠️ Limited |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **GNU General Public License v2.0** - see the [LICENSE](LICENSE) file for details.

---

## 👤 About

**KASELA Geolocation Intelligence** is developed by **Seli Kasela**, Founder & CEO of **KASELA™ GLOBAL GROUP**.

### KASELA™ GLOBAL GROUP
- 🌊 **KASELA SURF** - Premium surf tourism experiences
- 💻 **KASELA TECH** - Enterprise technology solutions
- 🎨 **KASELA STUDIO** - Creative digital services
- 📺 **KASELA MEDIA** - Premium content & digital influence

**Core Philosophy:** Build useful things. Build beautiful things. Build lasting things. ⚡

---

## 📞 Contact & Connect

- 🌐 **GitHub**: [@Seli-Kasela8](https://github.com/Seli-Kasela8)
- 📧 **Email**: [your.email@kasela.global]
- 🌍 **Website**: [kasela.global]
- 💼 **LinkedIn**: Coming Soon
- 🐦 **Twitter**: Coming Soon

---

## 🙏 Acknowledgments

- **Leaflet** - Interactive mapping library
- **Chart.js** - Data visualization library
- **OpenStreetMap** - Map data provider
- **W3C Geolocation API** - Standard positioning specification

---

<h3 align="center">
  <em>Building the future of premium tourism & technology from Bali to the world.</em>
  <br><br>
  ⚡ Build useful things. Build beautiful things. Build lasting things. ⚡
</h3>

<p align="center">
  <strong>KASELA™ GEOLOCATION INTELLIGENCE</strong>
  <br>
  <em>Part of KASELA™ GLOBAL GROUP | Est. 2024 | Based in Bali 🏝️ | Global Vision 🌍</em>
</p>