import { CanvasLocal } from './canvasLocal.js';
window.onload = () => {
    let canvas = document.getElementById('circlechart');
    let graphics = canvas.getContext('2d');
    const miCanvas = new CanvasLocal(graphics, canvas);
    // ✅ variable global
    window.funcionActual = "x";
    // ✅ elementos
    const input = document.getElementById("funcion");
    const btn = document.getElementById("btnGraficar");
    // ✅ evento
    btn.onclick = () => {
        console.log("Función:", input.value); // para verificar
        window.funcionActual = input.value;
        miCanvas.paint();
    };
    // inicial
    miCanvas.paint();
};
