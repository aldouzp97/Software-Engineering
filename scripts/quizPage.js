let questions;
let nowQuestionIndex=0;
let resultArray=[];
let seconds = 1;


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
  let result={}
  let indicator = document.getElementById("indicator" + nowQuestionIndex);
  let q = questions[nowQuestionIndex];
  if (q.answers[index] == q.rightAns) {
    indicator.setAttribute("src", "/image/check.svg");
    result["result"]="correct";
  } else {
    indicator.setAttribute("src", "/image/close.svg");
    result["result"]="wrong";
  }
  if (nowQuestionIndex <4) {
    nowQuestionIndex++;
    initQuestionAndAnswers();
  } else {
    clearInterval(countSeconds);
    let dialog = document.getElementById("dialog");
    dialog.setAttribute("style", "display:block");
  }
  result["qid"]=q.qid;
  result["time"]=seconds;
  resultArray.push(result);
  seconds = 1;
}

function finishQuiz() {
  window.location.replace("/finishQuiz?resultArray="+JSON.stringify(resultArray));
}

window.addEventListener('load', function() {
  //console.log('All assets loaded')
  inactivityTime();

  getQuizQuestions();
});