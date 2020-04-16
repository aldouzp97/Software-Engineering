let check = 1;

function addQuestion() {
    let question = document.querySelector("#input_question").value;
    let answer1 = document.querySelector("#input_answer1").value;
    let answer2 = document.querySelector("#input_answer2").value;
    let answer3 = document.querySelector("#input_answer3").value;

    if (question == "" || answer1 == "" || answer2 == "" || answer3 == "") {
        alert("Please input content.");
        return;
    }

    let rightAns;
    if (check == 1) {
        rightAns = answer1;
    } else if (check == 2) {
        rightAns = answer2;
    } else if (check == 3) {
        rightAns = answer3;
    }

    let q = new Question(question, [answer1, answer2, answer3], rightAns, 1);
    add(JSON.stringify(q));
}

function add(str) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/add");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
        window.location.replace("/questionPool");
    }
    xhttp.send(str);
}

function check1() {
    reset();
    document.querySelector("#img_check1").setAttribute("src", "image/ic_check.png");
    check = 1;
}

function check2() {
    reset();
    document.querySelector("#img_check2").setAttribute("src", "image/ic_check.png");
    check = 2;
}

function check3() {
    reset();
    document.querySelector("#img_check3").setAttribute("src", "image/ic_check.png");
    check = 3;
}

function reset() {
    document.querySelector("#img_check1").setAttribute("src", "image/ic_circle.png");
    document.querySelector("#img_check2").setAttribute("src", "image/ic_circle.png");
    document.querySelector("#img_check3").setAttribute("src", "image/ic_circle.png");
}

class Question {
    constructor(question, answers, rightAns, uid) {
        this.question = question;
        this.answers = answers;
        this.rightAns = rightAns;
        this.qid = uid;
    }
}
