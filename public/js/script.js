var shouldIWait = false;
var daysData = {}
var currentMonthDisplaying = 7;
var currentYearDisplaying = 2018;

function slideToTheRight() {
    if (!shouldIWait) {
        var nextPageContent = document.getElementsByClassName("right")[0];
        var currentPageContent = document.getElementsByClassName("current")[0];
        var hiddenPageContent = document.getElementsByClassName("left")[0];

        nextPageContent.className = "page-content current";
        currentPageContent.className = "page-content left";
        hiddenPageContent.className = "page-content right hidden";

        shouldIWait = true;
        window.setTimeout(function(){shouldIWait = false}, 350); // wait for the animations to end
    
        //update the squares and current month info
        currentMonthDisplaying++;
        if(currentMonthDisplaying >= 12) {
            currentMonthDisplaying = 0;
            currentYearDisplaying++;
        }
        spawnDays();
    }
}

function slideToTheLeft() {
    if (!shouldIWait) {
        var nextPageContent = document.getElementsByClassName("left")[0];
        var currentPageContent = document.getElementsByClassName("current")[0];
        var hiddenPageContent = document.getElementsByClassName("right")[0];

        nextPageContent.className = "page-content current";
        currentPageContent.className = "page-content right";
        hiddenPageContent.className = "page-content left hidden";

        shouldIWait = true;
        window.setTimeout(function(){shouldIWait = false}, 350); // wait for the animations to end
    
        //update the squares and current month info
        currentMonthDisplaying--;
        if(currentMonthDisplaying < 0) {
            currentMonthDisplaying = 11;
            currentYearDisplaying--;
        }
        spawnDays();
    }
    
}

function spawnDays() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];

    currentPageContentContainer.getElementsByClassName("page-content-month-name")[0].innerHTML = monthsNames[currentMonthDisplaying];
    daysContainer.innerHTML = "";

    for( var day = 0 ; day < daysData[currentYearDisplaying][currentMonthDisplaying].length; day++ ) {
        var isSundayTradeOff = "day-square-closed";
        if (daysData[currentYearDisplaying][currentMonthDisplaying][day][1]) {isSundayTradeOff = "day-square-avaible";}
        daysContainer.innerHTML += '<div class="day-square '+isSundayTradeOff+'">'+daysData[currentYearDisplaying][currentMonthDisplaying][day][0]+'</div><!---->';
    }
}

function getServerData() {

    const http = new XMLHttpRequest()

    http.open("GET", "http://localhost:8080/api/get-data?2018")
    http.send()
    
    http.onload = () => {
        daysData = JSON.parse(http.responseText);
        spawnDays();
    }
   
}
getServerData();