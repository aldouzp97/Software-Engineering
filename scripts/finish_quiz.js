let resultArray = JSON.parse(new URLSearchParams(window.location.search).get("resultArray"));
let username = new URLSearchParams(window.location.search).get("username")

getAverageTime();
initResultAndTime();
saveQuizResult();

function getAverageTime() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/getAverageTime");
    xhttp.onload = function () {
        let averageTime = JSON.parse(this.response).averageTime;
        document.getElementById("p3").textContent = "Average completion time: " + averageTime + " seconds";
    }
    xhttp.send();
}

function initResultAndTime() {
    let totalRight = 0;
    let totalTime = 0;
    resultArray.forEach(function (item, index) {
        if (item["result"] == item["right"]) {
            totalRight++;
        }
        totalTime += item["time"];
    });

    document.getElementById("p1").textContent = "You got " + totalRight + " out 5 questions correct";
    if (totalTime < 60) {
        document.getElementById("p2").textContent = "You completed the quiz in: " + totalTime + " seconds";
    } else {
        let m = Math.floor(totalTime / 60);
        let s = totalTime % 60;
        document.getElementById("p2").textContent = "You completed the quiz in: " + m + " minutes " + s + " seconds";
    }

    for (let i = 0; i < resultArray.length; i++) {
        let t = resultArray[i]["time"] * 100 / totalTime;
        document.getElementById("quesTime" + i).setAttribute("style", "width:" + t + "%;display:inline");
        document.getElementById("quesTime" + i).textContent = "Q" + (resultArray[i].index + 1) + ": " + Math.round(t) + "%";
    }
}

function saveQuizResult() {
    let random = Math.round(Math.random() * 1000);
    let xhttp = new XMLHttpRequest();
    let request_url = "http://localhost:3000/saveResult1";
    xhttp.open('POST', request_url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({"user": username, "result": resultArray}));
}

function enterLeaderBoard() {
    window.location.replace("/leaderBoard");
}

function back() {
    window.location.replace("/chooseQuizToStart");
}


