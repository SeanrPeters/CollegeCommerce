// Placeholder for fetching data from a JSON file
function loadListings(map) {
    fetch('listings.json')
        .then(response => response.json())
        .then(data => {
            // Add listings to the map
            addListingsToMap(map, data.listings);
        })
        .catch(error => {
            console.error("Error fetching listings:", error);
        });
}

// Loop through listings and add markers to the map
function addListingsToMap(map, listings) {
    listings.forEach(function(listing) {
        var popupContent = createPopupContent(listing);
        var marker = L.marker(listing.coords).addTo(map);
        marker.bindPopup(popupContent);
        marker.on('click', function(e) {
            L.DomEvent.stopPropagation(e); 
            this.openPopup(); // open the popup
        });
    });
}

// Create the HTML content for a listing's popup
function createPopupContent(listing) {
    return `
      <div class="listing-popup">
          <h3>${listing.title}</h3>
          <img src="${listing.photoUrls[0]}" alt="${listing.title}" width="100" onclick="openModal(this)" />
          <div class="price">${listing.price}</div>
          <a href="${listing.url}" style="text-decoration: none;"><button>More Info</button></a>
      </div>
    `;
}