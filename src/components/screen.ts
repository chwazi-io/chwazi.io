import { Dot } from "./dot.ts";

export class Screen extends HTMLElement {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  dots: Record<number, Dot> = {};

  constructor(){
    super();
  }

  draw() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    Object.keys(this.dots).forEach(id => {
      this.dots[Number(id)].draw();
    });
  }

  connectedCallback(){
    this.attachShadow({mode:"open"});
    this.canvas = document.createElement("canvas");
    this.shadowRoot?.appendChild(this.canvas);
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    let that = this;

    window.addEventListener("resize", function(){
      that.resize()
    });

    this.context = this.canvas.getContext("2d")!;
    this.draw();

    this.addEventListener("touchstart", this.startTouch);
    this.addEventListener("touchmove", this.moveTouch);
    this.addEventListener("touchend", this.endTouch);
  }

  private startTouch(event: TouchEvent) {
    const newTouches = [ ... event.targetTouches ].filter(touch => !this.dots[touch.identifier]);
    newTouches.forEach(touch => this.dots[touch.identifier] = new Dot(this.context, touch));
    this.draw();
  }

  private moveTouch(event: TouchEvent) {
    [ ...event.targetTouches ].forEach(touch => this.dots[touch.identifier].updateTouch(touch));
    this.draw();
  }

  private endTouch(event: TouchEvent) {
    const touchIds = [ ... event.targetTouches ].map(t => t.identifier);
    Object.entries(this.dots)
    .filter(([ id, dot ]) => !touchIds.includes(Number(id)))
    .forEach(([ id, dot ]) => delete this.dots[Number(id)]);
    this.draw();
  }

  private resize(){
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    this.draw()
  }
}
