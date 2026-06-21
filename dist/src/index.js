import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
window.funcionActual = "x";
const inputDatos = document.getElementById("datos");
const btn = document.getElementById("btnGraficar");
btn.onclick = () => {
    let valores = inputDatos.value.split(",").map(Number);
    miCanvas.paintBarras(valores);
};
