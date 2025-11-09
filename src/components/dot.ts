export class Dot {
  constructor() {
    this.location = {x: 0, y: 0}
  }

  draw(ctx){
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, 40, 0, 2 * Math.PI);
    ctx.fill();
  }
}
