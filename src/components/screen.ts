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

    this.playerPicker.draw();

    this.addEventListener("touchstart", this.startTouch);
    this.addEventListener("touchmove", this.moveTouch);
    this.addEventListener("touchend", this.endTouch);
  }

  private startTouch(event: TouchEvent) {
    console.log('start touch');
    const newTouches = [ ... event.targetTouches ].filter(t => !this.playerPicker.getPlayerById(t.identifier));
    newTouches.forEach(touch => this.playerPicker.addPlayer(new Player(touch)));
    this.playerPicker.draw();
  }

  private moveTouch(event: TouchEvent) {
    console.log('move touch');
    [ ...event.targetTouches ].forEach(t => this.playerPicker.getPlayerById(t.identifier)?.updateTouch(t));
    this.playerPicker.draw();
  }

  private endTouch(event: TouchEvent) {
    console.log('end touch');
    const touchIds = [ ... event.targetTouches ].map(t => t.identifier);
    this.playerPicker.players.forEach(p => !touchIds.includes(p.id));
    this.playerPicker.draw();
  }

  private resize(){
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    this.playerPicker.draw()
  }
}
