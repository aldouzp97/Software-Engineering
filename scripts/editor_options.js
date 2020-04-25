let pathArray = window.location.pathname.split("/");
let title = document.getElementsByClassName("p_title");
title[0].textContent = "Edit Quiz " + getQuizNumber();

//Return to the homepage.
function goHome() {
  window.location.href = "/";
}

//Return to the quiz select page for the editor.
function anotherQuiz() {
  window.location.href = "/chooseQuizToEdit";
}

initRadioList();

// Check the button selected, make sure only one selected, open relative page.
function validateForm() {
  let number_selected = getWaitingList().length;

  if (number_selected != null) {
    if (number_selected === 0) {
      alert("You need to select an option");
    }

    if (number_selected === 1) {
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
}

//Go to the relevant page
function goToPage(numberOfQuestions){
  console.log(numberOfQuestions);
  if (getWaitingList()[0] === 0) {
    if (numberOfQuestions === 0) {
      alert("No questions currently in the pool");
    } else {
      window.location.href = "/preview/" + getQuizNumber();
    }
  }else if (getWaitingList()[0] === 1) {
    if (confirm("Doing this will overwrite the current question pool, are you ok with this?")) {
      window.location.href = "/prepareQuiz/"+getQuizNumber();
    }
  }else if (getWaitingList()[0] === 2) {
    if (numberOfQuestions === 5) {
      alert("Already have the maximum number of questions, please remove one before continuing.");
    }
    if (numberOfQuestions < 5) {
      window.location.href = "/addChoice/"+getQuizNumber();
    }
  }else if (getWaitingList()[0] === 3) {
    if (numberOfQuestions === 0) {
      alert("No questions currently in the pool");
    } else {
      window.location.href = "/removeQuestion/"+getQuizNumber();
    }
  }else if (getWaitingList()[0] === 4) {
    window.location.href = "/getStatistics/"+getQuizNumber();
  }
}

//Initialise the options on the page.
function initRadioList() {
  let options = ["View Current Questions", "Prepare Quiz", "Add Question", "Remove Question", "Display Statistics"];
  options.forEach(function (option, index) {
    let p = document.createElement("p");
    p.setAttribute("class", "item_text");
    p.textContent = option;

    let img_check = document.createElement("img");
    img_check.setAttribute("class", "item_check");
    img_check.setAttribute("src", "/image/ic_circle.png");

    let div_item = document.createElement("div");
    div_item.setAttribute("class", "item")
    div_item.append(img_check,p);

    div_item.addEventListener("click", function () {
      if (waitingList.length < 1) {
        addItemIntoWaitingList(index,div_item,img_check);
      } else if (waitingList.length===1 && waitingList.includes(index)) {
        addItemIntoWaitingList(index,div_item,img_check);
      } else {
        alert("You cannot select more than one option at a time.")
      }
    });

    let list = document.getElementById("list");
    list.append(div_item);
  });
}

let waitingList = [];

//Add current selected to the array of waiting objects.
function addItemIntoWaitingList(index,div_item,img_check) {
  if (!waitingList.includes(index)) {
    waitingList.push(index);
    div_item.setAttribute("class", "item_selected");
    img_check.setAttribute("src", "/image/ic_check.png");
  } else {
    let new_index = waitingList.indexOf(index);
    waitingList.splice(new_index, 1);
    div_item.setAttribute("class", "item");
    img_check.setAttribute("src", "/image/ic_circle.png");
  }
}

//Get the current waiting list.
function getWaitingList() {
  return waitingList;
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
