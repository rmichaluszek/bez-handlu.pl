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
      
        var currentYearDisplayingArray = daysData.filter(obj => {
           return obj.year === currentYearDisplaying;
        });
        if (currentYearDisplayingArray[0]!=null) {
            currentYearDisplayingArray = currentYearDisplayingArray[0].months;
        } else {
            currentYearDisplayingArray = false;
        }
    
        if(!currentYearDisplayingArray || currentYearDisplayingArray[currentMonthDisplaying].length == 1) // that means there is no info about trade-off days yet
            spawnNoDaysAvaibleInfo();
        else updateDays();

        if(leftArrowDeactivated) { //enable the left arrow
            enableLeftArrow();
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
        
        var currentYearDisplayingArray = daysData.filter(obj => {
           return obj.year === currentYearDisplaying;
        });
        if (currentYearDisplayingArray[0]!=null) {
            currentYearDisplayingArray = currentYearDisplayingArray[0].months;
        } else {
            currentYearDisplayingArray = false;
        }
    
        if(!currentYearDisplayingArray || currentYearDisplayingArray[currentMonthDisplaying].length == 1) // that means there is no info about trade-off days yet
            spawnTheLawStartInfo();
        else updateDays();

        if(rightArrowDeactivated) { //enable the left arrow
            enableRightArrow();
        }

        var pageContainer = document.getElementById("page-container");
        pageContainer.style.backgroundColor = colors[currentMonthDisplaying];
    }
    
}

function updateDays() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];

    var table = contentContainer.getElementsByClassName("page-content-days-table")[0];
    var otherInfo = contentContainer.getElementsByClassName("page-content-other-info")[0];

    //show the table if it was hidden, removing 'hidden-table' class
    table.className = "page-content-days-table";
    otherInfo.innerHTML = "";

    var firstDay = getMonthFirstDay(currentYearDisplaying,currentMonthDisplaying)-1;
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
                table.getElementsByClassName("cell"+String(y*7+x))[0].className = "cell"+String(y*7+x);

                if(x==6) {
                    table.getElementsByClassName("cell"+String(y*7+x))[0].className = "cell"+String(y*7+x) +" cell-tradeable-sunday";
                }
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

    var currentYearDisplayingArray = daysData.filter(obj => {
        return obj.year === currentYearDisplaying;
    });
    if (currentYearDisplayingArray[0]!=null) {
        currentYearDisplayingArray = currentYearDisplayingArray[0].months;
      
        //apply the tradeoff days from server data
        for ( var i = 0; i < currentYearDisplayingArray[currentMonthDisplaying].length; i++ ) {
            var tradeoffType = currentYearDisplayingArray[currentMonthDisplaying][i][1];
            var className = String(currentYearDisplayingArray[currentMonthDisplaying][i][0]-1+firstDay);
            table.getElementsByClassName("cell"+className)[0].className = "cell"+className+" cell-tradeoff-"+tradeoffType;
        }
    } 
    
}

function spawnNoDaysAvaibleInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];
 
    var otherInfo = contentContainer.getElementsByClassName("page-content-other-info")[0];
    var monthName = contentContainer.getElementsByClassName("page-content-month-name")[0];
    var table = contentContainer.getElementsByClassName("page-content-days-table")[0];

    otherInfo.innerHTML = "";

    monthName.innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
    otherInfo.innerHTML += "<h3>Jeszcze nie ma informacji o niedzielach bez handlu na ten miesiąc.</br></h3>"
    otherInfo.innerHTML += "<h4>Zostaną one dodane wraz z pojawieniem się dat.</br></h4>"

    //hide table
    table.className = "page-content-days-table hidden-table";

    disableRightArrow();
}

function spawnTheLawStartInfo() {
    var currentPageContentContainer = document.getElementsByClassName("current")[0];
    var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];
 
    var otherInfo = contentContainer.getElementsByClassName("page-content-other-info")[0];
    var monthName = contentContainer.getElementsByClassName("page-content-month-name")[0];
    var table = contentContainer.getElementsByClassName("page-content-days-table")[0];

    otherInfo.innerHtml = "";

    monthName.innerHTML = monthsNames[currentMonthDisplaying] +" "+ currentYearDisplaying;
    otherInfo.innerHTML = "<h3>W tym czasie ustawa <a href='https://orka.sejm.gov.pl/proc8.nsf/ustawy/870_u.htm'>o ograniczeniu handlu w niedziele i święta oraz w niektóre inne dni</a> nie była jeszcze wdrożona.</br></h3>"
    otherInfo.innerHTML += "<h4>Zaczęła ona działać z dniem <b>10 Stycznia 2018 r.</b> i obowiązuje aż do teraz.</br></h4>"

    //hide table
    table.className = "page-content-days-table hidden-table";

    disableLeftArrow();
}

//Arrow deactivations and activations

function disableLeftArrow() {
    var leftArrow = document.getElementById("arrowLeft");
    leftArrow.className = "arrow arrowDeactivated";
    leftArrow.style.pointerEvents = 'none'; 
    leftArrowDeactivated = true;
}
function disableRightArrow() {
    var rightArrow = document.getElementById("arrowRight");
    rightArrow.className = "arrow arrowDeactivated";
    rightArrow.style.pointerEvents = 'none'; 
    rightArrowDeactivated = true;
}
function enableRightArrow() {
    var rightArrow = document.getElementById("arrowRight");
    rightArrow.className = "arrow";
    rightArrow.style.pointerEvents = 'auto'; 
    rightArrowDeactivated = false;
}
function enableLeftArrow() {
    var leftArrow = document.getElementById("arrowLeft");
    leftArrow.className = "arrow";
    leftArrow.style.pointerEvents = 'auto';
    leftArrowDeactivated = false;
}

function getMonthFirstDay(year,month) {
    var result = new Date(year,month,1).getDay();

    if ( result === 0 ) {
        result = 7;
    }
    return result;
}
function getMonthLastDay(year,month) {
    return new Date(year,month + 1, 0);
}
function getDaysCountOfMonth(year,month) {
    var thisYear = year;
    var thisMonth = month;
    if(thisMonth <= -1) {
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
        var result = JSON.parse(http.responseText);
      console.log(result);
        if (result.status == 'success') {
            daysData = result.data;
            getData();
            createDaysTable(document.getElementsByClassName("current")[0]);
            createDaysTable(document.getElementsByClassName("left")[0]);
            createDaysTable(document.getElementsByClassName("right")[0]);
            updateDays();
        } else {
            disableLeftArrow();
            disableRightArrow();
          
            //Show message and hide the table
            var currentPageContentContainer = document.getElementsByClassName("current")[0];
            var contentContainer = currentPageContentContainer.getElementsByClassName("content-container")[0];

            var otherInfo = contentContainer.getElementsByClassName("page-content-other-info")[0];
            var monthName = contentContainer.getElementsByClassName("page-content-month-name")[0];
            var table = contentContainer.getElementsByClassName("page-content-days-table")[0];

            otherInfo.innerHTML = "";

            monthName.innerHTML = "Wystąpił błąd";
            otherInfo.innerHTML += "<h3>"+result.message+"</h3>";
            table.className = "page-content-days-table hidden-table";
        }        
    }
}

function createDaysTable(div) {
    var table = div.getElementsByClassName("page-content-days-table")[0];
    for ( var y = 0; y < 7; y++ ) {
        var tr = document.createElement("tr");
        for ( var x = 0; x < 7; x++ ) {
            var td = document.createElement("td");
            if(y > 0) {
              td.innerHTML += '...';
              td.className = "cell"+String((y-1)*7+x);
            } else {
              td.innerHTML += daysNames[x];
              td.className = "header";
              if (x == 6) {
                  td.className = "header sunday";
              }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
}

function getData() {
    var date = new Date();

    currentMonthDisplaying = date.getMonth();
    currentYearDisplaying = date.getFullYear();
}
getServerData();