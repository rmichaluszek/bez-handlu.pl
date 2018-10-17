var shouldIWait = false;

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
    }
}