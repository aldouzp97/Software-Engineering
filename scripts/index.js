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