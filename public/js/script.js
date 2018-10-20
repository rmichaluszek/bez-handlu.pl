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
        if(daysData[currentYearDisplaying]==null || daysData[currentYearDisplaying][currentMonthDisplaying].length == 1) // that means there is no info about trade-off days yet
            spawnNoDaysAvaibleInfo();
        else spawnDays();
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
    }
    
}

function spawnDays() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    currentPageContentContainer.getElementsByClassName("page-content-month-name")[0].innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
    daysContainer.innerHTML = "";

    for( var day = 0 ; day < daysData[currentYearDisplaying][currentMonthDisplaying].length; day++ ) {
        var isSundayTradeOff = "day-square-closed";
        if (daysData[currentYearDisplaying][currentMonthDisplaying][day][1]) {isSundayTradeOff = "day-square-avaible";}
        daysContainer.innerHTML += '<div class="day-square '+isSundayTradeOff+'">'+daysData[currentYearDisplaying][currentMonthDisplaying][day][0]+'</div><!---->';
    }
}

function spawnNoDaysAvaibleInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    currentPageContentContainer.getElementsByClassName("page-content-month-name")[0].innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
    daysContainer.innerHTML = "";
    daysContainer.innerHTML += "<h3>Jeszcze nie ma informacji o niedzielach bez handlu na ten miesiąc.</br></h3>"
    daysContainer.innerHTML += "<h4>Zostaną one dodane wraz z pojawieniem się dat.</br></h4>"
}
function spawnTheLawStartInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var daysContainer = currentPageContentContainer.getElementsByClassName("square-container")[0];
 
    currentPageContentContainer.getElementsByClassName("page-content-month-name")[0].innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
    daysContainer.innerHTML = "";
    daysContainer.innerHTML += "<h3>W tym czasie ustawa <a href='https://orka.sejm.gov.pl/proc8.nsf/ustawy/870_u.htm'>o ograniczeniu handlu w niedziele i święta oraz w niektóre inne dni</a> nie była jeszcze wdrożona.</br></h3>"
    daysContainer.innerHTML += "<h4>Zaczęła ona działać z dniem <b>10 Stycznia 2018 r.</b> i obowiązuje aż do teraz.</br></h4>"
}

function getServerData() {

    const http = new XMLHttpRequest()

    http.open("GET", "http://localhost:8080/api/get-data")
    http.send()
    
    http.onload = () => {
        daysData = JSON.parse(http.responseText);
        spawnDays();
    }
   
}
getServerData();