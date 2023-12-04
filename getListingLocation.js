window.onload = function() {
    var map = L.map('map').setView([41.1490, -81.3419], 15);
    initializeMap(map);
    setUpLocationPicker(map);
};

function initializeMap(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function setUpLocationPicker(map) {
    let marker;

    map.on('click', function(e) {
        const { lat, lng } = e.latlng;
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;

        // Add or move the marker to the clicked location
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
    });
}


//randomizes location up to about 500 feet for privacy 
function randomizeLocation(lat, lng) {
    const maxOffset = 0.0013736; // Approx 500 feet in degrees
    const latOffset = Math.random() * maxOffset * 2 - maxOffset;
    const lngOffset = Math.random() * maxOffset * 2 - maxOffset;
    return { 
        lat: lat + latOffset, 
        lng: lng + lngOffset 
    };
}