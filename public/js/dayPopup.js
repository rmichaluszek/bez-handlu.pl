function showDayPopup(year,month,day,info) {
    var dayPopup = document.getElementById("day-popup-container");
    dayPopup.style.opacity = 1;
    dayPopup.style.zIndex = 100;
    if(month<10) {
       month = "0"+month;
    }
    document.getElementById("day-popup-header").innerHTML = year+"."+month+"."+day;
    document.getElementById("day-popup-content").innerHTML = info;
}

function hideDayPopup() {
    var dayPopup = document.getElementById("day-popup-container");
    dayPopup.style.opacity = 0;
    dayPopup.style.zIndex = -1;
}