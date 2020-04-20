let pathArray = window.location.pathname.split("/");
let max_selected = 1;
let question_pool;
let question_pool_length;
let question_to_add;

function goBack() {
  window.location.href = "/editor/" + pathArray[2];
}

// Load all questions from the question pool that aren't currently in the quiz.
getQuestionList();
getQuestionToAdd();

function getQuestionToAdd() {
  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/pool" + pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "text/csv");
  xhttp.onload = function () {
    var json_string=jsonFromCSV(this.response);
    question_pool = JSON.parse(json_string);
  }
  xhttp.send();
}

function getQuestionList() {
  let xhttp = new XMLHttpRequest();
  let request_url = "http://localhost:3000/notinpool" + pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "text/csv");
  xhttp.onload = function () {
    var json_string=jsonFromCSV(this.response);
    questions_pool = JSON.parse(json_string);
    initList(this.response);
  }
  xhttp.send();
}

function initList(res) {
  var json_string=jsonFromCSV(res);
  console.log(json_string);
  let list = JSON.parse(json_string);
  console.log(list);
  list.forEach(function (item, index) {
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

function jsonFromCSV(response) {
  var lines = response.split("\r\n");
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    var answers = [];
    answers.push(currentline[1]);
    answers.push(currentline[2]);
    answers.push(currentline[3]);
    obj['question'] = currentline[0];
    obj['answers'] = answers;
    obj['rightAns'] = currentline[4];
    obj['qid'] = currentline[5];
    result.push(obj);
  }
  return JSON.stringify(result);
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
  console.log(waitingList);
}

function addQuestion() {
  if (waitingList.length < max_selected) {
    alert("Please select at least " + max_selected + " questions.");
    return
  }

  question_pool.forEach((item, index) => {
    if (parseInt(item.qid) === parseInt(waitingList[0])) {
      question_to_add = item;
    }
  });
  let question = [question_to_add.question, question_to_add.answers, question_to_add.rightAns, question_to_add.qid];

  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', "http://localhost:3000/add"+pathArray[2]);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    window.location.replace("/editor/"+pathArray[2]);
  }
  xhttp.send(JSON.stringify(question));
}
