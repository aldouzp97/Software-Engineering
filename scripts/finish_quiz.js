let resultArray = JSON.parse(new URLSearchParams(window.location.search).get("resultArray"));

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
        if (item["result"]==item["right"]) {
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

    for (let i = 0; i < 5; i++) {
        let t = resultArray[i]["time"] * 100 / totalTime;
        document.getElementById("quesTime" + i).setAttribute("style", "width:" + t + "%");
        document.getElementById("quesTime" + i).textContent = "Q" + (i + 1) + ": " + Math.round(t) + "%";
    }
}

function saveQuizResult() {
    let xhttp = new XMLHttpRequest();
    let request_url = "http://localhost:3000/saveResult1";
    xhttp.open('POST', request_url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({"result": resultArray}));
}

function back() {
    window.location.replace("/chooseQuizToStart");
}


