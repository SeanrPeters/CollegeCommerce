document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('listingForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
      Description: document.getElementById('description').value,
      Price: document.getElementById('price').value,
      Title: document.getElementById('title').value,
      Photo_Urls: document.getElementById('photos').value,
      Longitude: document.getElementById('longitude').value,
      Latitude: document.getElementById('latitude').value,
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
