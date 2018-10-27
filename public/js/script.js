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
        else updateDays();

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
        else updateDays();

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

function updateDays() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];

    var table = contentContainer.getElementsByClassName("page-content-days-table")[0];

    var firstDay = getMonthFirstDay(currentYearDisplaying,currentMonthDisplaying).getDay()-1;
    var previousMonthDaysInMonth = getDaysCountOfMonth(currentYearDisplaying,currentMonthDisplaying-1);
    var daysInMonth = getDaysCountOfMonth(currentYearDisplaying,currentMonthDisplaying)-1;
    
    contentContainer.getElementsByClassName("page-content-month-name")[0].innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
 
    for ( var y = 0; y < 6; y++ ) {
        for ( var x = 0; x < 7; x++ ) {
            if (y*7+x+1-firstDay <= 0 ) {
                table.getElementsByClassName("cell"+String(y*7+x))[0].className = "cell"+String(y*7+x)+ " cell-disabled";
                table.getElementsByClassName("cell"+String(y*7+x))[0].innerHTML = y*7+x+1-firstDay+previousMonthDaysInMonth;
            } else if (y*7+x-firstDay > daysInMonth) {
                table.getElementsByClassName("cell"+String(y*7+x))[0].className = "cell"+String(y*7+x)+ " cell-disabled";
                table.getElementsByClassName("cell"+String(y*7+x))[0].innerHTML = y*7+x+1-firstDay-daysInMonth-1;
            } 
            else {
                table.getElementsByClassName("cell"+String(y*7+x))[0].innerHTML = y*7+x+1-firstDay;
            }
        }
    }
    if (table.getElementsByClassName("cell35")[0].className == "cell35 cell-disabled") {
        //hide last row because its not used by current month {}
        table.getElementsByClassName("cell35")[0].parentNode.className = "hidden-tr";
    } else {
        //show it otherwise
        table.getElementsByClassName("cell35")[0].parentNode.className = "";
    }

    //apply the tradeoff days from server data
    for ( var i = 0; i < daysData[currentYearDisplaying][currentMonthDisplaying].length; i++ ) {
        var tradeoffType = daysData[currentYearDisplaying][currentMonthDisplaying][i][1];
        var className = String(daysData[currentYearDisplaying][currentMonthDisplaying][i][0]-1+firstDay);
        table.getElementsByClassName("cell"+className)[0].className = "cell"+className+" cell-tradeoff-"+tradeoffType;
    }
}

function spawnNoDaysAvaibleInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];
 
    contentContainer.innerHTML = '<div class="page-content-month-name">'+monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying+'</div>';
    contentContainer.innerHTML += "<h3>Jeszcze nie ma informacji o niedzielach bez handlu na ten miesiąc.</br></h3>"
    contentContainer.innerHTML += "<h4>Zostaną one dodane wraz z pojawieniem się dat.</br></h4>"

    //disable the right arrow
    var rightArrow = document.getElementById("arrowRight");
    rightArrow.className = "arrow arrowDeactivated";
    rightArrow.style.pointerEvents = 'none'; 
    rightArrowDeactivated = true;
}

function spawnTheLawStartInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];
 
    contentContainer.innerHTML = '<div class="page-content-month-name">'+monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying+'</div>';
    contentContainer.innerHTML += "<h3>W tym czasie ustawa <a href='https://orka.sejm.gov.pl/proc8.nsf/ustawy/870_u.htm'>o ograniczeniu handlu w niedziele i święta oraz w niektóre inne dni</a> nie była jeszcze wdrożona.</br></h3>"
    contentContainer.innerHTML += "<h4>Zaczęła ona działać z dniem <b>10 Stycznia 2018 r.</b> i obowiązuje aż do teraz.</br></h4>"

    //disable the left arrow
    var leftArrow = document.getElementById("arrowLeft");
    leftArrow.className = "arrow arrowDeactivated";
    leftArrow.style.pointerEvents = 'none'; 
    leftArrowDeactivated = true;
}

function getMonthFirstDay(year,month) {
    return new Date(year,month,1);
}
function getMonthLastDay(year,month) {
    return new Date(year,month + 1, 0);
}
function getDaysCountOfMonth(year,month) {
    var thisYear = year;
    var thisMonth = month;
    if(thisMonth <= -1) { bb
        thisMonth = 11;
        thisYear -= 1;
    }
    return new Date(thisYear,thisMonth+ 1, 0).getDate();
}
function getServerData() {

    const http = new XMLHttpRequest()

    http.open("GET", "/api/get-data")
    http.send()
    
    http.onload = () => {
        daysData = JSON.parse(http.responseText);
        getData();
        createDaysTable(document.getElementsByClassName("current")[0]);
        createDaysTable(document.getElementsByClassName("left")[0]);
        createDaysTable(document.getElementsByClassName("right")[0]);
        updateDays();
    }
   
}

function createDaysTable(div) {
    var table = div.getElementsByClassName("page-content-days-table")[0];
    for ( var y = 0; y < 6; y++ ) {
        var tr = document.createElement("tr");
        for ( var x = 0; x < 7; x++ ) {
            var td = document.createElement("td");
            td.innerHTML += '...';
            td.className = "cell"+String(y*7+x);
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
;}

function getData() {
    var date = new Date();

    currentMonthDisplaying = date.getMonth();
    currentYearDisplaying = date.getFullYear();
}
getServerData();