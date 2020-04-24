let timeArray = [0, 0, 0, 0, 0];
let count = 0;
let countSeconds;
let nowQuestionIndex = 0;

getQuizQuestions();

function getQuizQuestions() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/quiz2");
    xhttp.onload = function () {
        initList(this.response);
    }
    xhttp.send();
}

function initList(str) {
    questions = JSON.parse(str).questions;
    initQuestionAndAnswers();
}

function initQuestionAndAnswers() {
    let q = questions[nowQuestionIndex];
    document.getElementById("question").textContent = q.question;
    document.getElementById("answer1").textContent = q.answers[0];
    document.getElementById("answer2").textContent = q.answers[1];
    document.getElementById("answer3").textContent = q.answers[2];
}

function enterQuestion(index) {
    nowQuestionIndex = index;
    let dialog = document.getElementById("dialog");
    dialog.setAttribute("style", "display:block");
    initQuestionAndAnswers();

    count = 1;
    document.getElementById("timer").textContent = count + "s";
    countSeconds = setInterval(function () {
        count++;
        let timer = document.getElementById("timer");
        timer.textContent = count + "s";
    }, 1000);
}

function selectAnswer(index) {
    clearInterval(countSeconds);
    timeArray[nowQuestionIndex] += count;

    let q = questions[nowQuestionIndex];
    if (q.answers[index] == q.rightAns) {
        alert("Correct");
        let wrap = document.getElementById("wrapper" + nowQuestionIndex);
        wrap.setAttribute("style", "opacity:0");
    } else {
        alert('Wrong')
    }
    let dialog = document.getElementById("dialog");
    dialog.setAttribute("style", "display:none");
}

function answerGuess() {
    let guess = document.getElementById("guess").value;
    if (guess == "wolf") {
        let dialog = document.getElementById("dialog_finish");
        dialog.setAttribute("style", "display:block");
    } else {
        alert("Wrong. Please try again.")
    }
}

function finishQuiz() {
    let input_name = document.getElementById("input_name");
    if (input_name.value == "") {
        alert("Please enter your name.");
        return
    }
    window.location.replace("/chooseQuizToStart");
}

function restart() {
    if (confirm("Are you sure to restart the quiz?")) {
        window.location.href = "/";
    }
}