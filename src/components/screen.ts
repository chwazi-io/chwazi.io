import { Dot } from "./dot.ts";

export class Screen extends HTMLElement {
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  // shadowRoot!: ShadowRoot;
  dots: Record<number, Dot> = {};

  constructor(){
    super();

    console.log(this.dots);
  }
  
  draw() {
    this.context.fillStyle = "orange";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  connectedCallback(){
    this.attachShadow({mode:"open"});
    this.canvas = document.createElement("canvas");
    this.shadowRoot.appendChild(this.canvas);
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    let that = this;

    window.addEventListener("resize", function(){
      that.resize()
    });

    // window.addEventListener("mousemove", (e) => {
    //   this.dot.location.x = e.x
    //   this.dot.location.y = e.y
    //   that.draw()
    // });

    this.context = this.canvas.getContext("2d")!;
    this.draw();

    this.addEventListener("touchstart", this.startTouch);
    this.addEventListener("touchmove", this.moveTouch);
  }

  private startTouch(event: TouchEvent) {
    const touch = event.targetTouches[event.targetTouches.length - 1];
    console.log(touch);
    const dot = new Dot(this.context);
    this.dots[touch.identifier] = dot;
    this.draw();
    dot.draw({ x: touch.clientX, y: touch.clientY});
  }

  private moveTouch(event: TouchEvent) {
    this.draw();
    [ ...event.targetTouches ].forEach(touch => {
      this.dots[touch.identifier].draw({ x: touch.clientX, y: touch.clientY });
    });
  }

  private resize(){
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    this.draw()
  }
}
