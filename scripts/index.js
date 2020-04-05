let menu_show = false;

function showMenu() {
    let div_menu = document.getElementById("div_menu");
    if (menu_show) {
        div_menu.style.display = "none";
        menu_show = false;
    } else {
        div_menu.style.display = "block";
        menu_show = true;
    }
}

readTextFile("./scripts/questions.txt");

function readTextFile(file) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4) {
            if (rawFile.status == 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;
                document.cookie = "quizdata:" + allText;
            }
        }
    }
    rawFile.send(null);
}