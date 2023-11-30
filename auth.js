

function updateUIBasedOnSignIn(isSignedIn) {
    var loginButton = document.getElementById('loginButton');
    var logoutButton = document.getElementById('logoutButton');
    var formContainer = document.querySelector('.form-container');
    var addListingLink = document.getElementById('addListingLink');
    var signInPrompt = document.getElementById('signInPrompt');

    if (isSignedIn) {
        // Handle index.html elements
        if (loginButton) loginButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (addListingLink) addListingLink.style.display = 'block'; // Show plus sign
        if (signInPrompt) signInPrompt.style.display = 'none'; // Hide sign-in prompt

        // Handle addListing.html elements
        if (formContainer) formContainer.style.display = 'block';
    } else {
        // Handle index.html elements
        if (loginButton) loginButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (addListingLink) addListingLink.style.display = 'none'; // Hide plus sign
        if (signInPrompt) signInPrompt.style.display = 'block'; // Show sign-in prompt

        // Optionally hide the form on addListing.html when logged out
        if (formContainer) formContainer.style.display = 'none';
    }
}

function logout() {
    // Remove user session from local storage
    localStorage.removeItem('isUserSignedIn');
    updateUIBasedOnSignIn(false);

    // Google Sign-Out
    if (google && google.accounts && google.accounts.id) {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(localStorage.getItem('userEmail'), done => {
            console.log('Google account logout successful');
            // Clear user's Google account information from local storage
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userProfileImage');
        });
    }

    // Redirect to home page
    window.location.href = 'index.html';
}

// Check user state on page load
document.addEventListener("DOMContentLoaded", function() {
    const isUserSignedIn = localStorage.getItem('isUserSignedIn') === 'true';
    updateUIBasedOnSignIn(isUserSignedIn);
});
