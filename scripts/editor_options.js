let pathArray = window.location.pathname.split("/");

function goHome() {
  window.location.href = "/";
}

function addQuestion() {
  window.location.href = "/addQuestion/"+pathArray[2];
}


// Used to react to radio buttons.
function validateForm() {
  let radioButtons = document.getElementsByName("option");
  let count = countChecked(radioButtons);
  console.log(returnSelectedValue());

  if (count === 0) {
    alert("You need to select an option");
  }
  if (count > 1) {
    alert("Too many selected");
  }

  if (count === 1) {
    alert("You have selected the one and only option: "+returnSelectedValue());
    if (returnSelectedValue() === "a") {
      window.location.href = "/preview/" + getQuizNumber();
    }else if (returnSelectedValue() === "b") {
      window.location.href = "/questionPool/"+getQuizNumber();
    }else if (returnSelectedValue() === "c") {
      window.location.href = "/addQuestion/"+getQuizNumber();
    }else if (returnSelectedValue() === "d") {
      window.location.href = "/addQuestion/"+getQuizNumber();
    }else if (returnSelectedValue() === "e") {

    }else if (returnSelectedValue() === "f") {

    }
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
      console.log(radioButtons[i].value);
      selected_value = radioButtons[i].value;
    }
  }
  return selected_value;
}

function getQuizNumber() {
  let pathArray = window.location.pathname.split("/");
  let quizId=1;
  if (pathArray[1] == "editor") {
      quizId = pathArray[2];
  }
  return quizId;
}