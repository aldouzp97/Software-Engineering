let pathArray = window.location.pathname.split("/");
let title = document.getElementsByClassName("p_title");
title[0].textContent = "Preview Quiz " + getQuizNumber();

function goBack() {
  window.location.href = "/editor/" + getQuizNumber();
}

getQuestionList();

function getQuestionList() {
  let xhttp = new XMLHttpRequest();
  let pathArray = window.location.pathname.split("/");
  let request_url = "http://localhost:3000/quiz"+pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    initList(this.response);
  }
  xhttp.send();
}

function initList(res) {
  let questions = JSON.parse(res);
  let list = questions.questions;
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

function getQuizNumber() {
  let quizId=1;
  if (pathArray[1] == "preview") {
      quizId = pathArray[2];
  }
  return quizId;
}

function goToAdd() {
  window.location.href = "/addQuestion/" + pathArray[2];
}

function goToAddCustom() {
  window.location.href = "/addCustomQuestion/" + pathArray[2];
}