export class Dot {
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public draw(location: { x: number, y: number }) {
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(location.x, location.y, 40, 0, 2 * Math.PI);
    this.context.fill();
  }
}
