import { Dot } from "./dot.ts";

export class Screen extends HTMLElement {
  constructor(){
    super();
  }
  draw() {
    console.log('Run Draw()')
    this.context.fillStyle = "orange";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); 
    this.dot.draw(this.context)
  }
  connectedCallback(){
    this.dot = new Dot() 
    console.log('conected callback()')
    this.attachShadow({mode:"open"})
    this.canvas = document.createElement("canvas")
    this.shadowRoot.appendChild(this.canvas)
    this.canvas.setAttribute("width", window.innerWidth);
    this.canvas.setAttribute("height", window.innerHeight);
    let that = this;

    window.addEventListener("resize", function(){
      that.resize()
    })
    window.addEventListener("mousemove", (e) => {
      console.log(e);
      this.dot.location.x = e.x
      this.dot.location.y = e.y
      that.draw()

    })

    this.context = this.canvas.getContext("2d");
    this.draw()
  }

  resize(){
    this.canvas.setAttribute("width", window.innerWidth);
    this.canvas.setAttribute("height", window.innerHeight);
    this.draw()
  }


}
