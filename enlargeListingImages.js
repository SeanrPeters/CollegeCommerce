
//handles enlarging the images in the main listing page
function enlargeImage(img) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}