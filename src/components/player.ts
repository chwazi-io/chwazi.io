export class Player {
  private touch: Touch;
  private _color: string;
  private pulseValue: number = 0;
  private addPulse = true;

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
    context.arc(this.touch.clientX, this.touch.clientY, 45 + this.pulseValue / 5, 0, 2 * Math.PI);
    context.fill();

    if (this.pulseValue > 40) {
      this.addPulse = false;
    } else if (this.pulseValue < 1) {
      this.addPulse = true;
    }

    //console.log(this.pulseValue);

    this.pulseValue += this.addPulse ? 1 : -1;
  }

  public drawDotBackground(context: CanvasRenderingContext2D): void {
    context.fillStyle = 'black';
    context.beginPath();
    context.arc(this.touch.clientX, this.touch.clientY, 80, 0, 2 * Math.PI);
    context.fill();
  }
}
