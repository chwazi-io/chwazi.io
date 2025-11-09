export class Player {
  private touch: Touch;

  public get id(): number {
    return this.touch.identifier;
  }

  constructor(touch: Touch) {
    this.touch = touch;
  }

  public updateTouch(touch: Touch): void {
    this.touch = touch;
  }

  public drawDot(context: CanvasRenderingContext2D): void {
    context.fillStyle = "red";
    context.beginPath();
    context.arc(this.touch.clientX, this.touch.clientY, 40, 0, 2 * Math.PI);
    context.fill();
  }
}
