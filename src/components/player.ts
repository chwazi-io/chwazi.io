export class Player {
  private touch: Touch;
  private _color: string;

  public get id(): number {
    return this.touch.identifier;
  }

  public get color(): string {
    return this._color;
  }


  constructor(touch: Touch, color: string) {
    this.touch = touch;
    this._color = color;
  }

  public updateTouch(touch: Touch): void {
    this.touch = touch;
  }

  public drawDot(context: CanvasRenderingContext2D): void {
    context.fillStyle = this._color;
    context.beginPath();
    context.arc(this.touch.clientX, this.touch.clientY, 50, 0, 2 * Math.PI);
    context.fill();
  }

  public drawDotBackground(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(this.touch.clientX, this.touch.clientY, 80, 0, 2 * Math.PI);
    context.fill();
  }
}
