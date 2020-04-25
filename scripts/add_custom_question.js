let pathArray = window.location.pathname.split("/");
let check = "";

function goBack() {
  window.location.href = "/editor/" + pathArray[2];
}

function sendQuestionInformation() {
  let question = document.querySelector("#input_question").value;
  let answer1 = document.querySelector("#input_answer1").value;
  let answer2 = document.querySelector("#input_answer2").value;
  let answer3 = document.querySelector("#input_answer3").value;

  if (question == "" && answer1 == "" && answer2 == "" && answer3 == "") {
    alert("Please input content.");
    return;
  }

  if (question == "") {
    alert("Please input the question.");
    return;
  }

  if (answer1 == "" || answer2 == "" || answer3 == "") {
    alert("Please make sure you have input 3 answers.");
    return;
  }

  let rightAns;
  if (check != "") {
    if (check == 1) {
      rightAns = answer1;
    } else if (check == 2) {
      rightAns = answer2;
    } else if (check == 3) {
      rightAns = answer3;
    }
  } else {
    alert("Please make sure you assign the correct answer to one of the questions by clicking the circle next to it.");
    return;
  }

  let q = [question, [answer1, answer2, answer3], rightAns];
  add(q);
}

function add(str) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', "http://localhost:3000/addCustom"+pathArray[2]);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function () {
    window.location.href = "/confirmCustomQuiz/"+pathArray[2];
  }
  xhttp.send(JSON.stringify(str));
}

function check1() {
  if (check === 1) {
    reset();
    check = "";
  } else if (check === 2 || check === 3) {
    alert("already have an option checked");
  } else {
    document.querySelector("#img_check1").setAttribute("src", "/image/ic_check.png");
    check = 1;
  }
}

function check2() {
  if (check === 2) {
    reset();
    check = "";
  } else if (check === 1 || check === 3) {
    alert("already have an option checked");
  } else {
    document.querySelector("#img_check2").setAttribute("src", "/image/ic_check.png");
    check = 2;
  }
}

function check3() {
  if (check === 3) {
    reset();
    check = "";
  } else if (check === 2 || check === 1) {
    alert("already have an option checked");
  } else {
    document.querySelector("#img_check3").setAttribute("src", "/image/ic_check.png");
    check = 3;
  }
}

function reset() {
  document.querySelector("#img_check1").setAttribute("src", "/image/ic_circle.png");
  document.querySelector("#img_check2").setAttribute("src", "/image/ic_circle.png");
  document.querySelector("#img_check3").setAttribute("src", "/image/ic_circle.png");
}
