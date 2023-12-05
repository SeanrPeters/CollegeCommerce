// Initialize the map on window load
window.onload = function() {
  var map = L.map('map').setView([41.1490, -81.3419], 15);
  initializeMap(map);
  loadListings(map);
};

function initializeMap(map) {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

