CurrentButton = document.getElementById("currentButton");
FutureButton = document.getElementById("futureButton");
AllButton = document.getElementById("allButton");
var alls = document.getElementsByClassName("prosjektcontainer");
var noncurrents = document.getElementsByClassName("notnow");
var currents = document.getElementsByClassName("current");

CurrentButton.addEventListener("click", function (event) {
    for (var i = 0; i < noncurrents.length; i++) {
        noncurrents[i].style.display = "none";
    }
    for (var y = 0; y < currents.length; y++) {
        currents[y].style.display = "flex";
    }

})
FutureButton.addEventListener("click", function (event) {
    for (var i = 0; i < currents.length; i++) {
        currents[i].style.display = "none"
    }
    for (var y = 0; y < noncurrents.length; y++) {
        noncurrents[y].style.display = "flex";
    }
})
AllButton.addEventListener("click", function (event) {
    for (var i = 0; i < alls.length; i++) {
        alls[i].style.display = "flex"
    }
})