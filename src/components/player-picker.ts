import { Player } from "./player";
import { NFingersPolicy } from "./nFingersPolicy.ts"; 
import { NGroupPolicy } from "./nGroupPolicy.ts"; 
const DURATION_TO_PICK_WINNER = 2000;
const DURATION_TO_RESTART = 3000;
const COLORS = [
  "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure",
  "Beige", "Bisque", "BlanchedAlmond", "Blue",
  "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse",
  "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson",
  "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGreen",
  "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange",
  "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue",
  "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue",
  "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen",
  "Fuchsia", "Gold", "GoldenRod", "Green", "GreenYellow",
  "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory",
  "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon",
  "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGreen",
  "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSteelBlue",
  "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta",
  "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple",
  "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed",
  "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite",
  "Navy", "OldLace", "Olive", "OliveDrab", "Orange",
  "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise",
  "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink",
  "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red",
  "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
  "SeaGreen", "SeaShell", "Sienna", "SkyBlue",
  "SlateBlue", "Snow", "SpringGreen", "SteelBlue",
  "Tan", "Teal", "Thistle", "Tomato", "Turquoise",
  "Violet", "Wheat", "Yellow", "YellowGreen"
];

export class PlayerPicker {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private _players: Player[] = [];
    private timer?: NodeJS.Timeout;
    private _phase: PlayerPickerPhase = PlayerPickerPhase.PlayersSelection;
    private _winners: Player[] = [];
    public _policy = new NFingersPolicy(); 
    private _resetCallback: () => void;

    public get players(): Player[] {
        return this._players;
    }

    public get phase(): PlayerPickerPhase {
        return this._phase;
    }

    private get availableColors(): string[] {
        const usedColors = this._players.map(p => p.color);

        return COLORS.filter(c => !usedColors.includes(c));
    }


    constructor(canvas: HTMLCanvasElement) { 
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
    }

    public getPlayerById(id: number): Player | undefined {
        return this._players.find(p => p.id == id);
    }

    public addPlayer(touch: Touch): void {
        if (this.getPlayerById(touch.identifier) || this.phase !== PlayerPickerPhase.PlayersSelection) {
            return;
        }

        const index = Math.floor(Math.random() * this.availableColors.length);

        this._players.push(new Player(touch, this.availableColors[index]));
        this.resetTimer();
    }

    public removePlayer(playerId: number) {
        const player = this.getPlayerById(playerId);

        if (!player || this.phase !== PlayerPickerPhase.PlayersSelection) {
            return;
        }

        const index = this._players.indexOf(player);
        this._players.splice(index, 1);
        this.resetTimer();
    }

    private resetTimer(): void {
        if (this.timer) {
            this.clearTimer();
        }

        if (this.players.length < 2) {
            return;
        }

        this.timer = setTimeout(() => this.choosePlayers(), DURATION_TO_PICK_WINNER);
    }

    public choosePlayers(): void {
        this.clearTimer();

        this._phase = PlayerPickerPhase.PlayersSelected;
        this._winners = this._policy.drawFingers(this._players);

        //TODO: change this to wait untill all finger gone from screen
        this.timer = setTimeout(() => this.reset(), DURATION_TO_RESTART);
        // this.draw();
    }

    private reset(): void {
        this.clearTimer();
        this._phase = PlayerPickerPhase.PlayersSelection;
        this._players = [];
        this._winners = [];
        this._resetCallback();
        // this.draw();
    }

    private clearTimer() {
        if (!this.timer) {
            return;
        }

        clearTimeout(this.timer);
    }


    public draw(): void {
        this.context.fillStyle = this._phase === PlayerPickerPhase.PlayersSelected ? this._winners[0].color : "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let playersToDraw = this.players;

        if (this.phase === PlayerPickerPhase.PlayersSelected) {
            playersToDraw = this._winners;
        }

        this._winners.forEach(player => player.drawDotBackground(this.context));

        // console.log(playersToDraw)
        playersToDraw.forEach(player => player.drawDot(this.context));

        requestAnimationFrame(() => this.draw());
    }

    public setPolicy(policyName: string){
      if (policyName === "nFingers") {
        this._policy = new NFingersPolicy();
      }else if(policyName === "makeGroups"){
        this._policy = new NGroupPolicy();
      }
    }
    public setResetCallback(f: () => void){
      this._resetCallback = f;
    }
}

export enum PlayerPickerPhase {
    PlayersSelection = 1,
    PlayersSelected = 2,
}
