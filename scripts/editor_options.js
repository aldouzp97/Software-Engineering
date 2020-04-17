// initOptions();

function goHome() {
  window.location.href = "/";
}

function addQuestion() {
  window.location.href = "/addQuestion";
}


// Used to check which element is pressed
function validateForm() {
  var radioButtons = document.getElementsByName("option");
  let count = countChecked(radioButtons);

  if (count === 0) {
    alert("You need to select an option");
  }
  if (count > 1) {
    alert("Too many selected");
  }

  if (count === 1) {
    alert("You have selected the one and only option: "+returnSelectedValue(radioButtons));
  }
}

function countChecked(radioButtons) {
  let count = 0;
  for(var i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked == true) {
      count += 1;
    }
  }
  return count;
}

function returnSelectedValue(radioButtons) {
  let selected_index = "";
  for(var i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked == true) {
      selected_index = radioButtons[i].value;
    }
  }
  return selected_index;
}

// function initOptions() {
//   let list = [];
//   list.forEach(function (item, index) {
//     let p = document.createElement("p");
//     p.setAttribute("class", "item_text");
//     p.textContent = "Question: " + item.question;
//
//     let p2 = document.createElement("p");
//     p2.setAttribute("class", "item_text");
//     p2.textContent = "Right Answer: " + item.rightAns;
//
//     let div_item = document.createElement("div");
//     div_item.setAttribute("class", "item")
//     div_item.append(p, p2);
//
//     let list = document.getElementById("list");
//     list.append(div_item);
//   });
// }