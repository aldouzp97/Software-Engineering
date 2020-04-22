getQuizResult();
let resultArray = [];
let timeArray = [];

function getQuizResult() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/quizResult1");
    xhttp.onload = function () {
        initList(this.response);
    }
    xhttp.send();
}

function initList(res) {
    let arr = JSON.parse(res);
    arr.forEach(function (item, index) {
        item.result.forEach(function (r, index) {
            let qid = r["qid"];
            if (resultArray[qid] == undefined) {
                resultArray[qid] = [];
                timeArray[qid] = [];
            }
            resultArray[qid].push(r["result"] == r["right"]);
            timeArray[qid].push(r["time"]);
        })
    });

    resultArray.forEach(function (item, index) {

        let totalCorrect = 0;
        let totalTime = 0;
        item.forEach(function (r, i) {
            if (r) {
                totalCorrect++;
            }
            totalTime += timeArray[index][i];
        });

        let correctPercent = Math.round(totalCorrect * 100 / item.length);
        let averageTime = Math.round(totalTime / item.length);

        let p1 = document.createElement("p");
        p1.textContent = "Question " + index + ":";

        let p2 = document.createElement("span");
        p2.textContent = "Correct Percent: " + correctPercent + "%";

        let p3 = document.createElement("span");
        p3.textContent = " Average Time: " + averageTime + " seconds";

        let div_item = document.createElement("div");
        div_item.append(p1, p2, p3);

        let list = document.getElementById("list");
        list.append(div_item);
    })
}

function enterLeaderBoard() {
    window.location.replace("/leaderBoard");
}