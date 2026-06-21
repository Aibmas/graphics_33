export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 6;
        this.rHeight = 4;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }
    /*iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
    iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
    */
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
    paint() {
        // ✅ LIMPIAR CANVAS
        this.graphics.clearRect(0, 0, this.maxX + 1, this.maxY + 1);
        // 🔷 FIGURA DEL PROFESOR (CUADRADO ORIGINAL)
        this.graphics.strokeStyle = "blue";
        this.drawLine(100, 100, 300, 100);
        this.drawLine(300, 100, 300, 300);
        this.drawLine(300, 300, 100, 300);
        this.drawLine(100, 300, 100, 100);
        /* this.drawLine(this.iX(-3), this.iY(0), this.iX(3), this.iY(0));
        this.drawLine(this.iX(0), this.iY(2), this.iX(0), this.iY(-2));
    
        //dibuja la cuadricula
        this.graphics.strokeStyle = 'lightgray';
        for (let x = -3; x <= 3; x+=0.25){
          this.drawLine(this.iX(x), this.iY(-2), this.iX(x), this.iY(2));
        }
        for (let y = -2; y <= 2; y+=0.25){
          this.drawLine(this.iX(-3), this.iY(y), this.iX(3), this.iY(y));
        }
    
        //dibuja las divisiones
        this.graphics.strokeStyle = 'black';
        for (let x = -3; x <= 3; x++){
          this.drawLine(this.iX(x), this.iY(-0.1), this.iX(x), this.iY(0.1));
          this.graphics.strokeText(x+"", this.iX(x-0.1), this.iY(-0.2));
        }
        for (let y = -2; y <= 2; y++){
          this.drawLine(this.iX(-0.1), this.iY(y), this.iX(0.1), this.iY(y));
        }
        this.graphics.strokeText("X", this.iX(2.9), this.iY(0.2));
        this.graphics.strokeText("Y", this.iX(-0.2), this.iY(1.8));
    
        //dibujar la funcion
        this.graphics.strokeStyle = 'red';
        let paso: number = 0.1;
        for (let x = -3; x <= 3; x+=paso){
          this.drawLine(this.iX(x), this.iY(this.fx(x)), this.iX(x+paso), this.iY(this.fx(x+paso)));
        }
        */
        /* FIGURAS ANTIGUAS (REFERENCIA)
        this.drawLine(320, 40, 480, 400);
        this.drawLine(320, 40, 140, 400);
        this.drawLine(140, 400, 480, 400);
        */
        // 🔥 FIGURA NUEVA PARA LA TAREA (HEXÁGONO)
        const cx = this.centerX;
        const cy = this.centerY;
        const lados = 6;
        const radio = 120;
        this.graphics.strokeStyle = "blue";
        this.graphics.beginPath();
        for (let i = 0; i <= lados; i++) {
            const angulo = (i * 2 * Math.PI) / lados;
            const x = cx + radio * Math.cos(angulo);
            const y = cy + radio * Math.sin(angulo);
            if (i === 0) {
                this.graphics.moveTo(x, y);
            }
            else {
                this.graphics.lineTo(x, y);
            }
        }
        this.graphics.stroke();
        /* TODO LO DEMÁS SE QUEDA TAL CUAL
        let lado = 1;
        let side = 0.95 * lado;
        let sideHalf = 0.5 * side;
        let xCenter = 320;
        let yCenter = 240;
          
        let h = sideHalf * Math.sqrt(3);
        let xA, yA, xB, yB, xC, yC,
        xA1, yA1, xB1, yB1, xC1, yC1, p, q;
        q = 0.05;
        p = 1 - q;
        */
        // ✅ 🔥 GRAFICADOR DE FUNCIONES
        this.graphics.strokeStyle = "red";
        this.graphics.lineWidth = 2;
        try {
            const funcion = window.funcionActual || "x";
            const f = new Function("x", "return " + funcion);
            let first = true;
            for (let px = 0; px <= this.maxX; px++) {
                let escala = 60; // 🔥 aumentar zoom
                let x = (px - this.centerX) / escala;
                let y = f(x);
                // controlar valores muy grandes
                if (y > 10 || y < -10)
                    continue;
                let py = this.centerY - y * escala;
                if (first) {
                    this.graphics.beginPath();
                    this.graphics.moveTo(px, py);
                    first = false;
                }
                else {
                    this.graphics.lineTo(px, py);
                }
            }
            this.graphics.stroke();
            this.graphics.lineWidth = 3;
        }
        catch (_a) {
            alert("Función inválida");
        }
    }
}
