let nowQuestionIndex = 0;

getQuizQuestions();

function enterQuestion(index) {
    nowQuestionIndex = index;
    let dialog = document.getElementById("dialog");
    dialog.setAttribute("style", "display:block");
    initQuestionAndAnswers();
}

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

function selectAnswer(index) {
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
        alert("Correct. This is a wolf.");
        window.location.replace("/chooseQuizToStart");
    } else {
        alert("Wrong. Please try again.")
    }
}