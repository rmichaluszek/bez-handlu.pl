function showInfoWindow() {
    var infoWindow = document.getElementById("info-window-container");
    infoWindow.style.opacity = 1;
    infoWindow.style.zIndex = 100;
}

function hideInfoWindow() {
    var infoWindow = document.getElementById("info-window-container");
    infoWindow.style.opacity = 0;
    infoWindow.style.zIndex = -1;
}