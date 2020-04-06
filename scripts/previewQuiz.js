let pathArray = window.location.pathname.split("/");
let quizId=1;
if (pathArray[1] == "previewQuiz") {
    quizId = pathArray[2];
}

let title = document.getElementById("title");
title.textContent = "Preview Quiz " + quizId;
