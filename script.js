

// event listeners, and dropdown interactions
document.addEventListener("DOMContentLoaded", function() {

    // Event listener for submitting a new listing
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
});

function initializeMap(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}


function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}
