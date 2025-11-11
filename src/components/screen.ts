import { PlayerPicker } from "./player-picker.ts";
import { Player } from "./player.ts";

export class Screen extends HTMLElement {
  static observedAttributes = ["policy", "n"];
  canvas!: HTMLCanvasElement;
  playerPicker!: PlayerPicker;
  n: int;

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
    this.setPolicy();
    this.setPolicyN();
    this.playerPicker.setResetCallback(() => {
      this.setAttribute("hideoverlay", "false");
    })
    let that = this;

    window.addEventListener("resize", function(){
      that.resize()
    });

    this.addEventListener("touchstart", this.startTouch);
    this.addEventListener("touchmove", this.moveTouch);
    this.addEventListener("touchend", this.endTouch);

    requestAnimationFrame(() => this.playerPicker.draw());
    this.setAttribute("hy", "false");
  }

  private startTouch(event: TouchEvent) {
    // console.log('start touch', event);
    [ ... event.targetTouches ].forEach(touch => this.playerPicker.addPlayer(touch));
    this.setAttribute("hideoverlay", "true");
    // this.playerPicker.draw();
  }

  private moveTouch(event: TouchEvent) {
    // console.log('move touch', event);
    [ ...event.changedTouches ].forEach(t => this.playerPicker.getPlayerById(t.identifier)?.updateTouch(t));
    // this.playerPicker.draw();
  }

  private endTouch(event: TouchEvent) {
    // console.log('end touch', event);
    [ ... event.changedTouches ].forEach(t => this.playerPicker.removePlayer(t.identifier));
    if (this.playerPicker.players.length == 0){
      this.setAttribute("hideoverlay", "false");
    }
    // this.playerPicker.draw();
  }

  private resize(){
    this.canvas.setAttribute("width", window.innerWidth.toString());
    this.canvas.setAttribute("height", window.innerHeight.toString());
    // this.playerPicker.draw()
  }

  private setPolicyN(){
    if (this.playerPicker === undefined) {
      return;
    }
    this.playerPicker._policy.setN(this.n);
  }
  
  private setPolicy(){
    if (this.playerPicker === undefined) {
      return;
    }
    this.playerPicker.setPolicy(this.policy);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "policy":
        this.policy = newValue;
        this.setPolicy();
        return;
      case "n":
        this.n = +newValue;
        this.setPolicyN();
        return;
      default:
        return;
    }
  }  
}
