var shouldIWait = false;
var daysData = {}
var currentMonthDisplaying = 7;
var currentYearDisplaying = 2018;

var leftArrowDeactivated = false;
var rightArrowDeactivated = false;

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
        if(daysData[currentYearDisplaying]==null || daysData[currentYearDisplaying][currentMonthDisplaying].length == 1) // that means there is no info about trade-off days yet
            spawnNoDaysAvaibleInfo();
        else spawnDays();

        if(leftArrowDeactivated) { //enable the left arrow
            var leftArrow = document.getElementById("arrowLeft");
            leftArrow.className = "arrow";
            leftArrow.style.pointerEvents = 'auto';
            leftArrowDeactivated = false;
        }

        var pageContainer = document.getElementById("page-container");
        pageContainer.style.backgroundColor = colors[currentMonthDisplaying];
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
        if(daysData[currentYearDisplaying]==null || daysData[currentYearDisplaying][currentMonthDisplaying].length == 1) // that means there is no info about trade-off days yet
            spawnTheLawStartInfo();
        else spawnDays();

        if(rightArrowDeactivated) { //enable the left arrow
            var rightArrow = document.getElementById("arrowRight");
            rightArrow.className = "arrow";
            rightArrow.style.pointerEvents = 'auto'; 
            rightArrowDeactivated = false;
        }

        var pageContainer = document.getElementById("page-container");
        pageContainer.style.backgroundColor = colors[currentMonthDisplaying];
    }
    
}

function spawnDays() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    daysContainer.innerHTML = '<div class="page-content-month-name">'+monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying+'</div>';

    for( var day = 0 ; day < daysData[currentYearDisplaying][currentMonthDisplaying].length; day++ ) {
        var isSundayTradeOff = "day-square-closed";
        if (daysData[currentYearDisplaying][currentMonthDisplaying][day][1]) {isSundayTradeOff = "day-square-avaible";}
        daysContainer.innerHTML += '<div class="day-square '+isSundayTradeOff+'">'+daysData[currentYearDisplaying][currentMonthDisplaying][day][0]+'</div><!---->';
    }
}

function spawnNoDaysAvaibleInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    daysContainer.innerHTML = '<div class="page-content-month-name">'+monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying+'</div>';
    daysContainer.innerHTML += "<h3>Jeszcze nie ma informacji o niedzielach bez handlu na ten miesiąc.</br></h3>"
    daysContainer.innerHTML += "<h4>Zostaną one dodane wraz z pojawieniem się dat.</br></h4>"

    //disable the right arrow
    var rightArrow = document.getElementById("arrowRight");
    rightArrow.className = "arrow arrowDeactivated";
    rightArrow.style.pointerEvents = 'none'; 
    rightArrowDeactivated = true;
}

function spawnTheLawStartInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    daysContainer.innerHTML = '<div class="page-content-month-name">'+monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying+'</div>';
    daysContainer.innerHTML += "<h3>W tym czasie ustawa <a href='https://orka.sejm.gov.pl/proc8.nsf/ustawy/870_u.htm'>o ograniczeniu handlu w niedziele i święta oraz w niektóre inne dni</a> nie była jeszcze wdrożona.</br></h3>"
    daysContainer.innerHTML += "<h4>Zaczęła ona działać z dniem <b>10 Stycznia 2018 r.</b> i obowiązuje aż do teraz.</br></h4>"

    //disable the left arrow
    var leftArrow = document.getElementById("arrowLeft");
    leftArrow.className = "arrow arrowDeactivated";
    leftArrow.style.pointerEvents = 'none'; 
    leftArrowDeactivated = true;
}

function getServerData() {

    const http = new XMLHttpRequest()

    http.open("GET", "/api/get-data")
    http.send()
    
    http.onload = () => {
        daysData = JSON.parse(http.responseText);
        getCurrentMonthAndYear();
        spawnDays();
    }
   
}

function getCurrentMonthAndYear() {
    var date = new Date();

    currentMonthDisplaying = date.getMonth();
    currentYearDisplaying = date.getFullYear();
}
getServerData();