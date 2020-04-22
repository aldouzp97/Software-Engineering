let pathArray = window.location.pathname.split("/");
let max_selected = 1;
let question_pool;
let quiz_questions;
let question_to_add = [];

function goBack() {
  window.location.href = "/editor/" + pathArray[2];
}

// Load all questions from the question pool that aren't currently in the quiz.
getPoolQuestions();
getQuizQuestions();

function getPoolQuestions() {
  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/pool" + pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    question_pool = JSON.parse(this.response);
  }
  xhttp.send();
}

function getQuizQuestions() {
  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/quiz" + pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    quiz_questions = JSON.parse(this.response);
    initList();
  }
  xhttp.send();
}

function initList() {
  let new_pool = getUnusedQuestions();
  console.log(new_pool);
  new_pool.forEach(function (item, index) {
    let p = document.createElement("p");
    p.setAttribute("class", "item_text");
    p.textContent = "Question: " + item.question;

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
      if (waitingList.length < max_selected) {
        addItemIntoWaitingList(item,div_item,img_check);
      } else if (waitingList.length===max_selected && waitingList.includes(item.qid)) {
        addItemIntoWaitingList(item,div_item,img_check);
      } else {
        alert("You cannot add more than " + max_selected + " question to the quiz, please unselect one first.")
      }
    });

    let list = document.getElementById("list");
    list.append(div_item);
  });
}

function getUnusedQuestions(){
  let new_pool = [];
  let contains = false;
  question_pool.forEach((pool_question, j) => {
    quiz_questions.questions.forEach((question, i) => {
      if (parseInt(question.qid) === parseInt(pool_question.qid)) {
        contains = true;
      }
    });
    if (contains === false) {
      new_pool.push(pool_question);
    }
    contains = false;
  });
  return new_pool;
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

function addQuestion() {
  if (waitingList.length < max_selected) {
    alert("Please select at least " + max_selected + " questions.");
    return
  }

  //Add the existing questions to the new temporary pool
  let temp_pool = [];
  quiz_questions.questions.forEach((question, i) => {
    temp_pool.push(question);
  });

  //Add the new question to the temporary pool
  question_pool.forEach((question, index) => {
    if (parseInt(question.qid) === parseInt(waitingList[0])) {
      temp_pool.push(question);
    }
  });

  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/addToTempPool";
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onload = function () {
    window.location.href = "/confirmQuiz/" + pathArray[2];
  }
  xhttp.send(JSON.stringify(temp_pool));
}
