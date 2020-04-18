let title = document.getElementsByClassName("p_title");
title[0].textContent = "Preview Quiz " + getQuizNumber();

function goBack() {
  window.location.href = "/editor/" + getQuizNumber();
}

function getQuizNumber() {
  let pathArray = window.location.pathname.split("/");
  let quizId=1;
  if (pathArray[1] == "preview") {
      quizId = pathArray[2];
  }
  return quizId;
}

getQuestionList();

function getQuestionList() {
  let xhttp = new XMLHttpRequest();
  let pathArray = window.location.pathname.split("/");
  let request_url = "http://localhost:3000/quiz";
  if (pathArray[2] === "1") {
    request_url += 1
  } else {
    request_url += 2
  }
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "text/csv");
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
    p.textContent = item.qid + " Question: " + item.question;

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

function jsonFromCSV(response) {
  var lines=response.split("\n");
  var result = [];
  var headers= ['question', 'answers', 'rightAns', 'quizId'];

  for(var i=0;i<lines.length;i++){
    var obj = {};
    var currentline=lines[i].split(",");
    var answers=[];
    answers.push(currentline[1]);
    answers.push(currentline[2]);
    answers.push(currentline[3]);
    for(var j=0;j<headers.length;j++){
      if (j===0) {
        obj[headers[j]] = currentline[j];
      }
      if (j===1) {
        obj[headers[j]] = answers;
      }
      if (j===2) {
        obj[headers[j]] = currentline[j];
      }
      if (j===3) {
        obj[headers[j]] = currentline[j];
      }
    }
    result.push(obj);
  }
  return JSON.stringify(result);
}
