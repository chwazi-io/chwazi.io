import type { Player } from "./player";

const DURATION_TO_PICK_WINNER = 2000;
const DURATION_TO_RESTART = 5000;

export class PlayerPicker {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private _players: Player[] = [];
    private timer?: NodeJS.Timeout;
    private _phase: PlayerPickerPhase = PlayerPickerPhase.PlayersSelection;
    private _winners: Player[] = [];

    public get players(): Player[] {
        return this._players;
    }

    public get phase(): PlayerPickerPhase {
        return this._phase;
    }

    constructor(canvas: HTMLCanvasElement) { 
        this.canvas = canvas;
        this.context = canvas.getContext("2d")!;
    }

    public getPlayerById(id: number): Player | undefined {
        return this._players.find(p => p.id == id);
    }

    public addPlayer(player: Player): void {
        if (this.getPlayerById(player.id) || this.phase !== PlayerPickerPhase.PlayersSelection) {
            return;
        }

        this._players.push(player);
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
        this._phase = PlayerPickerPhase.PlayersSelected;
        const index = Math.floor(Math.random() * this.players.length);

        this._winners.push(this._players[index]);

        console.log('winners', this._winners);

        this.timer = setTimeout(() => this.reset(), DURATION_TO_RESTART);
        this.draw();
    }

    private reset(): void {
        this._phase = PlayerPickerPhase.PlayersSelection;
        this._players = [];
        this._winners = [];
        this.draw();
    }

    private clearTimer() {
        if (this.timer) {
            return;
        }

        clearTimeout(this.timer);
    }


    public draw(): void {
        this.context.fillStyle = "orange";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let playersToDraw = this.players;

        if (this.phase === PlayerPickerPhase.PlayersSelected) {
            playersToDraw = this._winners;
        }

        playersToDraw.forEach(player => player.drawDot(this.context));
    }
}

export enum PlayerPickerPhase {
    PlayersSelection = 1,
    PlayersSelected = 2,
}