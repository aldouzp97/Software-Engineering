
let pathArray = window.location.pathname.split("/");

getQuestionList();

function getQuestionList() {
  let xhttp = new XMLHttpRequest();

  let request_url = "http://localhost:3000/pool";
  request_url += pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "text/csv");
  xhttp.onload = function () {
    initList(this.response);
  }
  xhttp.send();
}

function initList(res) {
  var json_string=jsonFromCSV(res);
  console.log(json_string);
  let list = JSON.parse(json_string);
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
      addItemIntoWaitingList(item,div_item,img_check);
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

function saveQuiz() {
  if (waitingList.length < 5) {
    alert("Please select at least 5 questions.");
    return
  }
  let xhttp = new XMLHttpRequest();
  let pathArray = window.location.pathname.split("/");
  let request_url = "http://localhost:3000/saveQuiz";
  request_url += pathArray[2];
  xhttp.open('POST', request_url);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(waitingList));
  window.location.replace("/editor/"+pathArray[2]);
}

function jsonFromCSV(response) {
  var lines = response.split("\r\n");
  var result = [];
  for (var i = 1; i < lines.length; i++) {
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