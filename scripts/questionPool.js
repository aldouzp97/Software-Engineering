getQuestionList();

function getQuestionList() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/questionList");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function () {
        initList(this.response);
    }
    xhttp.send();
}

function initList(res) {
    let list = JSON.parse(res);
    list.reverse();
    list.forEach(function (item, index) {
        let p = document.createElement("p");
        p.setAttribute("class", "item_text");
        p.textContent = "Question: " + item.question;

        let p2 = document.createElement("p");
        p2.setAttribute("class", "item_text");
        p2.textContent = "Right Answer: " + item.rightAns;

        let div_item = document.createElement("div");
        div_item.setAttribute("class", "item")
        div_item.append(p, p2);

        let list = document.getElementById("list");
        list.append(div_item);
    });
}