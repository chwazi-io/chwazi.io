import { PlayerPicker } from "./player-picker.ts";
import { Player } from "./player.ts";

export class Screen extends HTMLElement {
  canvas!: HTMLCanvasElement;
  playerPicker!: PlayerPicker;

  constructor(){
    super();
  }
  
  connectedCallback(){
    this.attachShadow({mode:"open"});
    this.canvas = document.createElement("canvas");
    this.shadowRoot?.appendChild(this.canvas);
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    this.playerPicker = new PlayerPicker(this.canvas);
    let that = this;

    window.addEventListener("resize", function(){
      that.resize()
    });

    this.addEventListener("touchstart", this.startTouch);
    this.addEventListener("touchmove", this.moveTouch);
    this.addEventListener("touchend", this.endTouch);

    requestAnimationFrame(() => this.playerPicker.draw());
  }

  private startTouch(event: TouchEvent) {
    // console.log('start touch', event);
    [ ... event.targetTouches ].forEach(touch => this.playerPicker.addPlayer(touch));
    // this.playerPicker.draw();
  }

  private moveTouch(event: TouchEvent) {
    // console.log('move touch', event);
    [ ...event.changedTouches ].forEach(t => this.playerPicker.getPlayerById(t.identifier)?.updateTouch(t));
    // this.playerPicker.draw();
  }

  private endTouch(event: TouchEvent) {
    // console.log('end touch', event);
    [ ... event.changedTouches ].forEach(t => this.playerPicker.removePlayer(t.identifier))
    // this.playerPicker.draw();
  }

  private resize(){
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    // this.playerPicker.draw()
  }
}
