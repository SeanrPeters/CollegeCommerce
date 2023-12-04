

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

document.getElementById('listingForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = {
      Description: document.getElementById('description').value,
      Price: document.getElementById('price').value,
      Title: document.getElementById('title').value,
      Photo_Urls: document.getElementById('photos').value,
  };

  fetch('http://localhost:1433/api/listings', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })

  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
});





















