// event listeners, and dropdown interactions
document.addEventListener("DOMContentLoaded", function() {
    var profileButton = document.querySelector('.dropdown .profile-button');
    profileButton.addEventListener('click', function() {
        var dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    });

    // Initialize the map on window load
    window.onload = function() {
        var map = L.map('map').setView([41.1490, -81.3419], 15);
        initializeMap(map);
        loadListings(map);
    };
});

function initializeMap(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

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

// This function returns a static array for demonstration 
function fetchListingsFromDatabase() {
    return [
      {
        id: '1',
        coords: [41.1519, -81.3449],
        imagePath: 'images/chair.png',
        price: '$100',
        title: 'Classic Chair',
        url: 'http://example.com/listing/1'
      },
      {
        id: '2',
        coords: [41.1495, -81.349],
        imagePath: 'images/ModernChair1.png',
        price: '$200',
        title: 'Modern Chair',
        url: 'http://example.com/listing/2'
      },
      {
        id: '3',
        coords: [41.1460, -81.3419],
        imagePath: 'images/ModernChair2.png',
        price: '$50',
        title: 'Budget Chair',
        url: 'http://example.com/listing/3'
      },
      {
        id: '4',
        coords: [41.1505, -81.3360],
        imagePath: 'images/ModernChair3.png',
        price: '$250',
        title: 'Chair',
        url: 'http://example.com/listing/4'
      }
    ];
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


function openModal(img) {
    // Get the modal
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;

    // Use the function to stop scrolling
    document.body.style.overflow = "hidden";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

    // Re-enable scrolling when the modal is closed
    document.body.style.overflow = "auto";
}

//Enlarges the Images in the listing
function enlargeImage(img) {
    // Check if the image is already enlarged
    if (img.classList.contains("enlarged")) {

        img.classList.remove("enlarged");
    
    } else {
        img.classList.add("enlarged");
      
    }
}


function shrinkImage(event) {
    var img = event.target;
    img.classList.remove("enlarged");
    // Stop the propagation of the click event to prevent reopening the image
    event.stopPropagation();
}















