import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = document.getElementById('circlechart') as HTMLCanvasElement;
graphics = canvas.getContext('2d')!;

const miCanvas: CanvasLocal = new CanvasLocal(graphics, canvas);


(window as any).funcionActual = "x";

const inputDatos = document.getElementById("datos") as HTMLInputElement;

const btn = document.getElementById("btnGraficar") as HTMLButtonElement;

btn.onclick = () => {

  let valores = inputDatos.value.split(",").map(Number);

  miCanvas.paintBarras(valores);

};