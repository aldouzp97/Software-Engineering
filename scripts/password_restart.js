function hidePassword() {
  var x = document.getElementById("password_field");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function checkValid() {
  var y = document.getElementById("password_field");
  if (y.value === "test") {
    window.location.href = "/chooseQuizToEdit";
  } else {
    if (y.value.length === 0) {
      var myText = "You haven't yet entered a password.";
      alert (myText);
    }
    if (y.value.length > 0) {
      var myText = "Incorrect password, please try again.";
      alert (myText);
    }
  }
}

function returnToHome() {
  window.location.href = "/";
}

function openEditor() {
  window.location.href = "/questionPool";
}
