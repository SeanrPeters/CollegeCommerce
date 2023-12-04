
//drop down in top right of index.html
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
});


