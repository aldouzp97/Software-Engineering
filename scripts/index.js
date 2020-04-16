function showMenu() {
  document.getElementById("div_menu").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function closeQuiz() {
  if (confirm("Close Window?")) {
    window.close();
  }
}

function startQuiz() {
  window.location.href = "/chooseQuizToStart";
}
