import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
graphics.fillStyle = "black";
const miCanvas = new CanvasLocal(graphics, canvas);
miCanvas.paint();
let vertices = [];
let angulo = 0;
let abrir = false;
document.addEventListener("keydown", (e) => {
    if (e.key === "a")
        abrir = true;
    if (e.key === "c")
        abrir = false;
});
fetch("./Puerta_estructurado_limpio.txt")
    .then(res => res.text())
    .then(data => {
    data.split("\n").forEach(linea => {
        let partes = linea.trim().split(" ");
        if (partes.length === 4) {
            vertices.push([
                parseFloat(partes[1]),
                parseFloat(partes[2]),
                parseFloat(partes[3])
            ]);
        }
    });
    animar();
});
function animar() {
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    if (abrir && angulo < Math.PI / 2)
        angulo += 0.02;
    if (!abrir && angulo > 0)
        angulo -= 0.02;
    vertices.forEach((v, i) => {
        //if(i%20 !== 0) return;
        let x = v[0];
        let y = v[1];
        let pivotX = -2;
        let xt = x - pivotX;
        let xr = xt * Math.cos(angulo) - y * Math.sin(angulo);
        let yr = xt * Math.sin(angulo) + y * Math.cos(angulo);
        xr += pivotX;
        let escala = 50;
        let px = xr * escala + canvas.width / 2;
        let py = -yr * escala + canvas.height / 2;
        miCanvas.drawPoint(px, py);
    });
    requestAnimationFrame(animar);
}
