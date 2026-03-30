/*
 * This file handles everything the app does:
 *   - Initialising the Google Map
 *   - Drawing coloured markers for each car park
 *   - Showing a detail panel when you click a marker 
 *   - Simulating "live" data changes on refresh
 *   - Keeping the stats bar up to date
 * 
 * It needs two things to run:
 *   1. The parkingLots array from data.js (loaded before this file)
 *   2. The Google Maps API (loaded after this file, with callback=initMap)
 */


// Global variables

let map;                    // the google.maps.Map instance
let markers = [];           // array of { marker, lot } objects so we can track them
let currentInfoWindow = null;  // whichever info popup is currently open (so we can close it)

// COLOUR HELPER
// Used in a few places — given a percentage of available spaces,
// returns a hex colour: green, orange, or red.
// 
// Thresholds:
//   > 50% available  →  green  (plenty of room)
//   > 20% available  →  orange (getting busy)
//   <= 20% available →  red    (nearly full)

function getAvailabilityColour(percentAvailable) {
    if (percentAvailable > 50) {
        return '#4CAF50'; 
    } else if (percentAvailable > 20) {
        return '#FFA726'; 
    } else {
        return '#EF5350'; 
    }
}



// MAP INITIALISATION
// This function is called automatically by the Google Maps API
// once it's finished loading (because of &callback=initMap in
// the script tag). It's basically the entry point for the app.

function initMap() {
    console.log('Initialising ParkWare with', parkingLots.length, 'parking locations');

    // Centre the map roughly between ATU and UoG so both campuses are visible
    const galwayCenter = { lat: 53.2780, lng: -9.0400 };

    // Create the map inside the #map div
    map = new google.maps.Map(document.getElementById("map"), {
        center: galwayCenter,
        zoom: 13,
        // Turn off most of the default Google Maps UI — we have our own controls
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        // Custom styling to hide point-of-interest labels and transit info.
        // This keeps the map cleaner so our parking markers stand out more.
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });

    // Drop a marker on the map for every car park in our data
    parkingLots.forEach(lot => {
        createParkingMarker(lot);
    });

    // Calculate and display the overall stats in the bar at the top
    updateOverallStats();

    console.log('ParkWare initialised successfully!');
}


// MARKER CREATION
// For a single parking lot, this creates a coloured circle
// marker on the map with the number of free spaces as a label.
// It also sets up the click behaviour (popup + detail panel).

function createParkingMarker(lot) {
    // Work out availability
    const available = lot.total - lot.occupied;
    const percentAvailable = (available / lot.total) * 100;

    // Pick the marker colour based on how full it is
    const colour = getAvailabilityColour(percentAvailable);

    // Bigger car parks get slightly bigger markers on the map,
    // just so they're more visually prominent
    let markerSize = 10;
    if (lot.total > 400) {
        markerSize = 14;
    } else if (lot.total > 200) {
        markerSize = 12;
    }

    // Create the actual Google Maps marker
    // We're using a circle symbol rather than the default pin,
    // filled with our availability colour
    const marker = new google.maps.Marker({
        position: lot.position,
        map: map,
        title: lot.name,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: markerSize,
            fillColor: colour,
            fillOpacity: 0.8,
            strokeColor: 'white',
            strokeWeight: 2
        },
        // The white number on top of the circle showing free spaces
        label: {
            text: available.toString(),
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold'
        }
    });

    // Build a small HTML popup (InfoWindow) that appears above the marker
    // when you click it. Just shows the name and a quick availability count.
    const infoContent = `
        <div style="padding: 10px; min-width: 150px;">
            <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px;">
                ${lot.name}
            </h3>
            <div style="font-size: 24px; font-weight: bold; color: ${colour};">
                ${available}/${lot.total}
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
                ${percentAvailable.toFixed(0)}% available
            </div>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });

    // When a marker is clicked:
    // 1. Close whatever popup was open before (if any)
    // 2. Open this marker's popup
    // 3. Show the full detail panel at the bottom of the screen
    marker.addListener('click', () => {
        if (currentInfoWindow) {
            currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
        showParkingInfo(lot);
    });

    // Keep a reference so we can remove these markers later during refresh
    markers.push({ marker, lot });
}



// DETAIL PANEL
// When you click a marker, this populates the slide-up card
// at the bottom of the screen with all the info about that
// car park — availability bar, spaces, pricing, hours.

function showParkingInfo(lot) {

    // display percentages
    const available = lot.total - lot.occupied;
    const percentFull = ((lot.occupied / lot.total) * 100).toFixed(0);
    const percentAvailable = 100 - percentFull;

    // Set the car park name and type badge
    document.getElementById('lotName').textContent = lot.name;

    // Capitalise the first letter of the type for the badge text
    // e.g. "university" → "University"
    const typeLabel = lot.type.charAt(0).toUpperCase() + lot.type.slice(1);
    document.getElementById('lotType').textContent = typeLabel;
    document.getElementById('lotType').className = `parking-type ${lot.type}`;

    // Fill in the three stat numbers
    document.getElementById('availableSpaces').textContent = available;
    document.getElementById('totalSpaces').textContent = lot.total;
    document.getElementById('percentFull').textContent = percentFull + '%';

    // Update the progress/fill bar
    // Width = how full the car park is (as a percentage)
    // Colour = based on how much space is LEFT (green/orange/red)
    const fillBar = document.getElementById('availabilityFill');
    fillBar.style.width = percentFull + '%';
    fillBar.style.background = getAvailabilityColour(percentAvailable);
    fillBar.textContent = `${lot.occupied}/${lot.total} occupied`;

    // Inject the pricing and hours info
    // Using innerHTML here because we're building a small HTML snippet.
    // The ternary on hourlyRate handles free vs paid parking.
    document.getElementById('additionalInfo').innerHTML = `
        <div class="info-row">
            <span class="info-label">Hourly Rate:</span>
            <span class="info-value">
                ${lot.hourlyRate > 0 ? '€' + lot.hourlyRate.toFixed(2) : 'Free'}
            </span>
        </div>
        <div class="info-row">
            <span class="info-label">Daily Max:</span>
            <span class="info-value">
                ${lot.maxDailyRate ? '€' + lot.maxDailyRate : 'N/A'}
            </span>
        </div>
        <div class="info-row">
            <span class="info-label">Hours:</span>
            <span class="info-value">${lot.openingHours}</span>
        </div>
    `;

    // Timestamp it
    document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();

    // Make the panel visible (CSS handles the slide-up animation)
    document.getElementById('parkingInfo').classList.add('active');
}


// Close the detail panel and any open info popup
function closeParkingInfo() {
    document.getElementById('parkingInfo').classList.remove('active');
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }
}

// OVERALL STATS
// Loops through every parking lot, totals up the free spaces
// and total capacity, then updates the stats bar at the top.
// Called on init and after every refresh.

function updateOverallStats() {
    let totalAvailable = 0;
    let totalSpaces = 0;

    parkingLots.forEach(lot => {
        totalAvailable += (lot.total - lot.occupied);
        totalSpaces += lot.total;
    });

    const avgAvailability = ((totalAvailable / totalSpaces) * 100).toFixed(0);

    document.getElementById('totalLots').textContent = parkingLots.length;
    document.getElementById('totalAvailable').textContent = totalAvailable.toLocaleString();
    document.getElementById('avgAvailability').textContent = avgAvailability + '%';
}


// DATA REFRESH (Simulated)
// 
// This is where the "live" part comes in — except it's not
// actually live. There's no real data source. Instead, we 
// randomly adjust each car park's occupied count to simulate
// cars arriving and leaving.
// 
// The randomisation isn't totally random though — it tries
// to be somewhat realistic based on the time of day:
//   - University lots fill up in the morning (8-11am)
//     and empty out in the evening (4-6pm)
//   - Shopping centres get busier in the afternoon/evening
//   - Everything else just gets a random ±10 swing
// 
// After updating the numbers, we destroy all the old markers
// and create fresh ones with the new colours/labels.
// (Not the most efficient approach — ideally you'd update
// the existing markers in place — but it works fine for 30 markers.)

function refreshData() {
    // Spin the refresh button while we "load"
    const btn = document.querySelector('.refresh-btn');
    btn.classList.add('spinning');

    // Fake a small delay to make it feel like a network request
    setTimeout(() => {

        // Go through each car park and nudge the occupied count
        parkingLots.forEach(lot => {
            const hour = new Date().getHours();
            let change;

            if (lot.type === 'university') {
                // University parking patterns:
                // Morning rush (8-11): more cars arriving
                // Evening exodus (4-6): cars leaving
                // Other times: small random changes
                if (hour >= 8 && hour <= 11) {
                    change = Math.floor(Math.random() * 15);
                } else if (hour >= 16 && hour <= 18) {
                    change = -Math.floor(Math.random() * 20);
                } else {
                    change = Math.floor(Math.random() * 20) - 10;
                }
            } else if (lot.type === 'shopping') {
                // Shopping centres get busier in the afternoon
                if (hour >= 14 && hour <= 20) {
                    change = Math.floor(Math.random() * 10);
                } else {
                    change = -Math.floor(Math.random() * 15);
                }
            } else {
                // Everything else: random variation either direction
                change = Math.floor(Math.random() * 20) - 10;
            }

            // Apply the change, but clamp it so we never go below 0
            // or above the total capacity
            lot.occupied = Math.max(0, Math.min(lot.total, lot.occupied + change));
        });

        // Wipe all existing markers off the map
        markers.forEach(({ marker }) => marker.setMap(null));
        markers = [];

        // Recreate them with the updated data
        parkingLots.forEach(lot => {
            createParkingMarker(lot);
        });

        // Recalculate the summary stats
        updateOverallStats();

        // Stop spinning the button
        btn.classList.remove('spinning');

        // Show a little toast notification
        showNotification('Data refreshed successfully');

    }, 1000); // 1 second fake delay
}



// TOAST NOTIFICATION
// Creates a temporary notification element, appends it to the
// page, then removes it after 2 seconds. The CSS animation
// handles the fade-in and fade-out.

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Clean it up after the animation finishes
    setTimeout(() => {
        notification.remove();
    }, 2000);
}


// AUTO-REFRESH
// Calls refreshData() every 30 seconds automatically,
// so the numbers keep changing even if you don't press
// the refresh button. 

setInterval(() => {
    refreshData();
}, 30000);


// Quick log so you know the script loaded
console.log('ParkWare loading...');
console.log('Total parking locations:', parkingLots.length);
