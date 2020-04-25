getLeaderBoard();

function getLeaderBoard() {
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', "http://localhost:3000/getLeaderBoard");
    xhttp.onload = function () {
        initList(JSON.parse(this.response));
    }
    xhttp.send();
}

function initList(arr) {
    arr.forEach(function (item, index) {

        let p1 = document.createElement("span");
        p1.setAttribute("class", "item");
        p1.textContent = (index + 1) + ". " + item.user;

        let p_score = document.createElement("span");
        p_score.setAttribute("class", "item");
        p_score.textContent = item.score;

        let p2 = document.createElement("span");
        p2.setAttribute("class", "item");
        let m = Math.floor(item.time / 60);
        if (m < 10) {
            m = "0" + m;
        }
        let s = item.time % 60;
        if (s < 10) {
            s = "0" + s;
        }
        p2.textContent = m + ":" + s;

        let div_item = document.createElement("div");
        div_item.append(p1,p_score, p2);

        document.getElementById("list").append(div_item);
    })
}