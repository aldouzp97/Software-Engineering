let questions;
let nowQuestionIndex=0;
let resultArray=[];
let seconds = 1;
let answerPercent={};
let buttonFlag = true;

let countSeconds=setInterval(function () {
  seconds++;
  let count = document.getElementById("count");
  count.textContent = seconds + "s";
}, 1000);

function startQuiz(quizId) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', "http://localhost:3000/quiz" + quizId);
  xhttp.onload = function () {
    if (JSON.parse(this.response).questions.length < 5) {
      alert("Please prepare the quiz with 5 questions.");
    } else {
      if (quizId == 1) {
        window.location.href = "/startQuizOne";
      } else {
        window.location.href = "/startQuizTwo";
      }
    }
  }
  xhttp.send();
}

// Reset and automatic reset
function reset() {
  window.location.href = "/";
  console.log("reset");
}

var inactivityTime = function() {
  var time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function logout() {
    alert("Due to inactivity the quiz will now be restarted");
    window.location.href = "/";
  }

  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logout, 300000);
    // 1000 milliseconds = 1 second
  }
}

function getQuizQuestions() {
  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', "http://localhost:3000/quiz1");
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
  document.getElementById("question").textContent=q.question;
  document.getElementById("answer1").textContent=q.answers[0];
  document.getElementById("answer2").textContent=q.answers[1];
  document.getElementById("answer3").textContent=q.answers[2];
}

function selectAnswer(index) {
  if (!buttonFlag) {
    return
  }
  let xhttp = new XMLHttpRequest();
  xhttp.open('POST', "http://localhost:3000/getAnswerPercent");
  xhttp.onload = function () {
    answerPercent = JSON.parse(this.response);
    handleSelectAnswer(index);
  }
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({"qid": questions[nowQuestionIndex].qid}));
}

function handleSelectAnswer(index) {
  let q = questions[nowQuestionIndex];
  let result = {}
  let indicator = document.getElementById("indicator" + nowQuestionIndex);
  let rightIndex=-1;
  q.answers.forEach(function (item, index) {
    if (item == q.rightAns) {
      rightIndex = index;
    }
  });
  result["result"] = index;
  result["right"] = rightIndex;
  if (q.answers[index] == q.rightAns) {
    indicator.setAttribute("src", "/image/check.svg");
    changeColor("green",index,q.answers[index]);
  } else {
    indicator.setAttribute("src", "/image/close.svg");
    changeColor("blue",index,q.answers[index]);
  }

  if (seconds < 1) {
    seconds = 1;
  }
  result["qid"] = q.qid;
  result["time"] = seconds;
  resultArray.push(result);
  seconds = 0;

  buttonFlag = false;
  setTimeout(function () {
    changeColor("red",index,null);

    if (nowQuestionIndex < 4) {
      nowQuestionIndex++;
      initQuestionAndAnswers();
    } else {
      clearInterval(countSeconds);
      let dialog = document.getElementById("dialog");
      dialog.setAttribute("style", "display:block");
    }
    buttonFlag = true;
  }, 1000);
}

function changeColor(color, index, answer) {
  let div_answer = document.getElementById("answer" + (index+1));
  if (color == "green") {
    div_answer.setAttribute("class", "answer bg_green");
    div_answer.textContent = answer + " " + Math.round((answerPercent[index]+1) * 100 / (answerPercent["total"]+1)) + "% of participants";
  } else if (color == "blue") {
    div_answer.setAttribute("class", "answer bg_blue");
    div_answer.textContent = answer + " " + Math.round((answerPercent[index]+1) * 100 / (answerPercent["total"]+1)) + "% of participants";
  } else if (color == "red") {
    div_answer.setAttribute("class", "answer bg_red");
  }
}

function finishQuiz() {
  window.location.replace("/finishQuiz?resultArray="+JSON.stringify(resultArray));
}

window.addEventListener('load', function() {
  //console.log('All assets loaded')
  inactivityTime();

  getQuizQuestions();
});