let pathArray = window.location.pathname.split("/");
getQuestions();

let questions;

function getQuestions() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/pool1");
    xhttp.onload = function () {
        questions = JSON.parse(this.response);
        getQuizResult();
    }
    xhttp.send();
}

function getQuestion(qid) {
    let q;
    questions.forEach(function (item, index) {
        if (item.qid == qid) {
            q = item;
        }
    });
    return q;
}

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

        let q = getQuestion(index);

        let p1 = document.createElement("p");
        p1.textContent = "Question " + index + ": " + q.question;

        let p_ans = document.createElement("p");
        p_ans.textContent = "Right Answer: " + q.rightAns;

        let p2 = document.createElement("span");
        p2.textContent = "Correct Percent: " + correctPercent + "%";

        let p3 = document.createElement("span");
        p3.textContent = " Average Time: " + averageTime + " seconds";

        let div_item = document.createElement("div");
        div_item.append(p1, p_ans, p2, p3);

        let list = document.getElementById("list");
        list.append(div_item);
    })
}

function enterLeaderBoard() {
    window.location.href = "/leaderBoard";
}

function back() {
    window.location.replace("/editor/"+pathArray[2]);
}