let pathArray = window.location.pathname.split("/");
let title = document.getElementsByClassName("p_title");
title[0].textContent = "Confirm Changes To Quiz " + getQuizNumber();

function goBack() {
  window.location.href = "/editor/" + getQuizNumber();
}

getQuestionList();

function getQuestionList() {
  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/getTempPool";
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    initList(this.response);
  }
  xhttp.send();
}

function initList(res) {
  let questions = JSON.parse(res);
  console.log(questions);
  let list = questions.questions;
  console.log(list);
  list.forEach(function (item, index) {
    let p = document.createElement("p");
    p.setAttribute("class", "item_text");
    p.textContent = "Question " + item.qid + ": " + item.question;

    let p2 = document.createElement("p");
    p2.setAttribute("class", "item_text");
    p2.textContent = "Right Answer: " + item.rightAns;

    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item")
    div_item.append(p, p2);

    let list = document.getElementById("list");
    list.append(div_item);
  });
}

function commitChanges() {
  if (confirm("Are you sure?")) {
    let xhttp = new XMLHttpRequest();
    let request_url = "http://localhost:3000/commitTempPool" + pathArray[2];
    xhttp.open('POST', request_url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
      window.location.href = "/editor/" + pathArray[2];
    }
    xhttp.send();
  } else {
    window.location.href = "/editor/" + pathArray[2];
  }
}

function commitCustomChanges() {
  if (confirm("Are you sure?")) {
    let xhttp = new XMLHttpRequest();
    let request_url = "http://localhost:3000/commitCustomTempPool" + pathArray[2];
    xhttp.open('POST', request_url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
      window.location.href = "/editor/" + pathArray[2];
    }
    xhttp.send();
  } else {
    window.location.href = "/editor/" + pathArray[2];
  }
}

function getQuizNumber() {
  let quizId=1;
  if (pathArray[1] === "preview" || pathArray[1] === "confirmQuiz" || pathArray[1] === "confirmCustomQuiz") {
      quizId = pathArray[2];
  }
  return quizId;
}