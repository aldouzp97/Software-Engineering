//Return to the homepage.
function goHome() {
  window.location.href = "/";
}

// Check the button selected, make sure only one selected, open relative page.
function validateForm() {
  let radioButtons = document.getElementsByName("option");
  let count = countChecked(radioButtons);

  if (count === 0) {
    alert("You need to select an option");
  }

  if (count > 1) {
    alert("Too many selected");
  }

  if (count === 1) {
    let xhttp = new XMLHttpRequest();
    let request_url = "http://localhost:3000/quiz" + getQuizNumber();
    xhttp.open('POST', request_url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
      if (this.response) {
        let parsed = JSON.parse(this.response);
        goToPage(parsed.questions.length);
      }
    }
    xhttp.send();
  }
}

//Go to the relevant page
function goToPage(numberOfQuestions){
  console.log(numberOfQuestions);
  if (returnSelectedValue() === "a") {
    if (numberOfQuestions === 0) {
      alert("No questions currently in the pool");
    } else {
      window.location.href = "/preview/" + getQuizNumber();
    }
  }else if (returnSelectedValue() === "b") {
    if (confirm("Doing this will overwrite the current question pool, are you ok with this?")) {
      window.location.href = "/prepareQuiz/"+getQuizNumber();
    }
  }else if (returnSelectedValue() === "c") {
    if (numberOfQuestions === 5) {
      alert("Already have the maximum number of questions, please remove one before continuing.");
    }
    if (numberOfQuestions < 5) {
      window.location.href = "/addChoice/"+getQuizNumber();
    }
  }else if (returnSelectedValue() === "d") {
    if (numberOfQuestions === 0) {
      alert("No questions currently in the pool");
    } else {
      window.location.href = "/removeQuestion/"+getQuizNumber();
    }
  }else if (returnSelectedValue() === "e") {
    window.location.href = "/getStatistics/1";
  }
}

// Count the number of radioButtons checked.
function countChecked(radioButtons) {
  let count = 0;
  for(var i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked == true) {
      count += 1;
    }
  }
  return count;
}

// Return the value of the radio button that's selected.
function returnSelectedValue() {
  let radioButtons = document.getElementsByName("option");
  let selected_value = "";
  for(var i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked == true) {
      selected_value = radioButtons[i].value;
    }
  }
  return selected_value;
}

//Return the currently selected quiz.
function getQuizNumber() {
  let pathArray = window.location.pathname.split("/");
  let quizId=1;
  if (pathArray[1] == "editor") {
    quizId = pathArray[2];
  }
  return quizId;
}