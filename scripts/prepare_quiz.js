let pathArray = window.location.pathname.split("/");
let title = document.getElementsByClassName("p_title");
title[0].textContent = "Prepare Quiz " + getQuizNumber();
let question_pool;

function goBack() {
  window.location.href = "/editor/" + getQuizNumber();
}

getQuestionList();

function getQuestionList() {
  let xhttp = new XMLHttpRequest();
  let pathArray = window.location.pathname.split("/");
  let request_url = "http://localhost:3000/pool"+pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    question_pool = JSON.parse(this.response);
    initRadioList(this.response);
  }
  xhttp.send();
}

function initRadioList(res) {
  let questions = JSON.parse(res);
  questions.forEach(function (item, index) {
    let p = document.createElement("p");
    p.setAttribute("class", "item_text");
    p.textContent = "Question " + item.qid + ": " + item.question;

    let p2 = document.createElement("p");
    p2.setAttribute("class", "item_text");
    p2.textContent = "Right Answer: " + item.rightAns;

    let img_check = document.createElement("img");
    img_check.setAttribute("class", "item_check");
    img_check.setAttribute("src", "/image/ic_circle.png");

    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item")
    div_item.append(img_check,p, p2);

    div_item.addEventListener("click", function () {
      if (waitingList.length < 5) {
        addItemIntoWaitingList(item,div_item,img_check);
      } else if (waitingList.length===5 && waitingList.includes(item.qid)) {
        addItemIntoWaitingList(item,div_item,img_check);
      } else {
        alert("You cannot add more than 5 questions to the quiz, please unselect one first.")
      }
    });

    let list = document.getElementById("list");
    list.append(div_item);
  });
}

let waitingList = [];

function addItemIntoWaitingList(item,div_item,img_check) {
  if (!waitingList.includes(item.qid)) {
    waitingList.push(item.qid);
    div_item.setAttribute("class", "item_selected");
    img_check.setAttribute("src", "/image/ic_check.png");
  } else {
    let index = waitingList.indexOf(item.qid);
    waitingList.splice(index, 1);
    div_item.setAttribute("class", "item");
    img_check.setAttribute("src", "/image/ic_circle.png");
  }
}

function addToTempPool() {
  if (waitingList.length < 5) {
    alert("Please select at least 5 questions.");
    return
  }

  let temp_pool=[];
  for (var i=0; i<waitingList.length; i++) {
    question_pool.forEach((question, index) => {
      if (waitingList[i]===question.qid) {
        temp_pool.push(question);
      }
    });
  }

  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/addToTempPool";
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onload = function () {
    window.location.href = "/confirmQuiz/" + pathArray[2];
  }
  xhttp.send(JSON.stringify(temp_pool));
}

function getQuizNumber() {
  let quizId=1;
  if (pathArray[1] == "prepareQuiz") {
      quizId = pathArray[2];
  }
  return quizId;
}
