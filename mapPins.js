// Get listings from database
function loadListings(map) {
    fetch('http://localhost:1433/api/listings', {
      method: 'GET',
    })

    .then(response => response.json())
    .then(data => {
        console.log("Retieved listings data.")
        // Add listings to the map
        addListingsToMap(map, data);
    })
    .catch(error => {
         console.error("Error fetching listings:", error);
    });
}

// Loop through listings and add markers to the map
function addListingsToMap(map, listings) {
    listings.forEach(function(listing) {
        var popupContent = createPopupContent(listing);
        var marker = L.marker([listing.Latitude, listing.Longitude]).addTo(map);
        marker.bindPopup(popupContent);
        marker.on('click', function(e) {
            L.DomEvent.stopPropagation(e); 
            this.openPopup(); // open the popup
        });
    });
}

// Create the HTML content for a listing's popup
// TODO use image from database
// TODO make the link actually go to a dynamic listing page
function createPopupContent(listing) {
    return `
      <div class="listing-popup">
          <h3>${listing.Title}</h3>
          <img src="\defaultImage.png" alt="${listing.Title}" width="100" onclick="openModal(this)" />
          <div class="price">$${listing.Price}</div>
          <a href="\listing.html" style="text-decoration: none;"><button>More Info</button></a>
      </div>
    `;
}
