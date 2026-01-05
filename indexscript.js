const html = document.querySelector('html');
const momobutton = document.getElementById("cursormomo");
const catbutton = document.getElementById("cursorcat");
const cursorcroc = document.getElementById("cursorcroc");
const cursorninjastar = document.getElementById("cursorninjastar");
const cursorwizard = document.getElementById("cursorwizard");



momobutton.addEventListener("click", (e) => {
    html.style.cursor = "url('./localresources/momo.png'), auto"
})
catbutton.addEventListener("click", (e) => {
    html.style.cursor = "url('./localresources/cursor.png'), auto"
})
cursorcroc.addEventListener("click", (e) => {
    html.style.cursor = "url('./localresources/cursorcroc.png'), auto"
})
cursorninjastar.addEventListener("click", (e) => {
    html.style.cursor = "url('./localresources/cursorshuriken.png'), auto"
})
cursorwizard.addEventListener("click", (e) => {
    html.style.cursor = "url('./localresources/cursorwizard.png'), auto"
})