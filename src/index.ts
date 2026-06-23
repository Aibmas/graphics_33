import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;
let caras: number[][] = [];

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

graphics.fillStyle = "black";

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

let vertices: number[][] = [];
let angulo = 0;
let abrir = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "a") abrir = true;
  if (e.key === "c") abrir = false;
});

fetch("./Puerta_estructurado_limpio.txt")
  .then(res => res.text())
  .then(data => {

    let leyendoCaras = false;

    data.split("\n").forEach(linea => {
      let partes = linea.trim().split(" ");

      if (linea.includes("Faces")) {
        leyendoCaras = true;
        return;
      }

      if (!leyendoCaras && partes.length === 4) {
        vertices.push([
          parseFloat(partes[1]),
          parseFloat(partes[2]),
          parseFloat(partes[3])
        ]);
      }

      if (leyendoCaras && partes.length >= 3) {
        let cara = partes.map(p => parseInt(p) - 1);
        caras.push(cara);
      }
    });

    animar();
  });

function animar(){

  graphics.clearRect(0,0,canvas.width,canvas.height);

  if (abrir && angulo < Math.PI/2) angulo += 0.05;
  if (!abrir && angulo > 0) angulo -= 0.05;

  let escala = 40;
  let offsetY = 200;
  let pivotX = 0;

  caras.forEach(c => {

    for (let i = 0; i < c.length; i++) {

      let v1 = vertices[c[i]];
      let v2 = vertices[c[(i+1)%c.length]];

      let x1 = v1[0];
      let y1 = v1[1];
      let z1 = v1[2];

      let x2 = v2[0];
      let y2 = v2[1];
      let z2 = v2[2];

      let xt1 = x1 - pivotX;
      let xt2 = x2 - pivotX;

      let xr1 = xt1*Math.cos(angulo) - z1*Math.sin(angulo);
      let zr1 = xt1*Math.sin(angulo) + z1*Math.cos(angulo);

      let xr2 = xt2*Math.cos(angulo) - z2*Math.sin(angulo);
      let zr2 = xt2*Math.sin(angulo) + z2*Math.cos(angulo);

      xr1 += pivotX;
      xr2 += pivotX;

      let px1 = xr1*escala + canvas.width/2;
      let py1 = -y1*escala + canvas.height/2 + offsetY;

      let px2 = xr2*escala + canvas.width/2;
      let py2 = -y2*escala + canvas.height/2 + offsetY;
graphics.strokeStyle = "#cc0505";
      graphics.beginPath();
graphics.moveTo(px1, py1);
graphics.lineTo(px2, py2);
graphics.stroke();

graphics.fillStyle = "Purple";
graphics.fillRect(px1 - 2, py1 - 2, 4, 4);

    }
  });

  requestAnimationFrame(animar);
}
