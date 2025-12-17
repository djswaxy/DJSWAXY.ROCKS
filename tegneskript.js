const canvas = document.getElementById("tegneCanvas");

// get canvas 2D context and set him correct size
const ctx = canvas.getContext('2d');
resize();

// last known position
let pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {

    const rect = canvas.getBoundingClientRect(); //canvas position

    // Trekk canvasets startposisjon (rect.left og rect.top) fra musens posisjon
    pos.x = e.clientX - rect.left;
    pos.y = e.clientY - rect.top;
}

// resize canvas
function resize() {
    ctx.canvas.width = 750;
    ctx.canvas.height = 500;
}
fargeinput = document.getElementById("tegneColorPicker");
function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath(); // begin

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    //velg farge med input
    fargeinput.addEventListener("input", () =>{
        ctx.strokeStyle = fargeinput.value;
        ctx.fillStyle = fargeinput.value;
    });

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
}
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function fillCanvas() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// kode for lagreknapp
const lagreKnapp = document.getElementById('lagreKnapp');

lagreKnapp.addEventListener('click', function() {

    const bildeUrl = canvas.toDataURL("image/png");
    const lenke = document.createElement('a');

    lenke.href = bildeUrl;

    //Bestem hva filen skal hete når den lastes ned
    lenke.download = 'tegning:P.png';
    lenke.click();
});