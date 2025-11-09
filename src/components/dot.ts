export class Dot {
  private context: CanvasRenderingContext2D;
  private touch: Touch

  constructor(context: CanvasRenderingContext2D, touch: Touch) {
    this.context = context;
    this.touch = touch;
  }

  public updateTouch(touch: Touch) {
    this.touch = touch;
  }

  public draw() {
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(this.touch.clientX, this.touch.clientY, 40, 0, 2 * Math.PI);
    this.context.fill();
  }
}
