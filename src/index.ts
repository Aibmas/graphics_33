import { CanvasLocal } from './canvasLocal.js';

window.onload = () => {

  let canvas = document.getElementById('circlechart') as HTMLCanvasElement;
  let graphics = canvas.getContext('2d')!;

  const miCanvas: CanvasLocal = new CanvasLocal(graphics, canvas);

  // ✅ variable global
  (window as any).funcionActual = "x";

  // ✅ elementos
  const input = document.getElementById("funcion") as HTMLInputElement;
  const btn = document.getElementById("btnGraficar") as HTMLButtonElement;

  // ✅ evento
  btn.onclick = () => {
    console.log("Función:", input.value); // para verificar
    (window as any).funcionActual = input.value;
    miCanvas.paint();
  };

  // inicial
  miCanvas.paint();
};