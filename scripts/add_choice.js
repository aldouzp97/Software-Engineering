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
    goToPage();
  }
}

//Go to the relevant page
function goToPage(){
  if (returnSelectedValue() === "a") {
    window.location.href = "/previewAdd/" + getQuizNumber();
  }
  if (returnSelectedValue() === "b") {
    window.location.href = "/previewAddCustom/" + getQuizNumber();
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