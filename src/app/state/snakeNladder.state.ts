import { State, Action, StateContext, Selector } from "@ngxs/store";
import {
  AddPlayer,
  RemovePlayer,
  MakeMove,
  RoleDice,
  NextPlayer,
  Won,
  Transport
} from "./../actions/snakeNladder.actions";
import { Player } from "../models/player.model";
import { TunnelMap } from "../models/snakesandladders";

export class SnakeNLadderStateModel {
  players: Player[];
  currentPlayerIndex: number;
  consecutiveSixs: number;
  winner: number;
}

@State<SnakeNLadderStateModel>({
  name: "SnakeNLadder",
  defaults: {
    players: [
      {
        name: "one",
        currentPosition: 0,
        sixs: 0,
        ladders: 0,
        snakes: 0
      },
      {
        name: "two",
        currentPosition: 0,
        sixs: 0,
        ladders: 0,
        snakes: 0
      }
    ],
    currentPlayerIndex: 0,
    consecutiveSixs: 0,
    winner: null
  }
})
export class SnakeNLadderState {
  @Selector()
  static getPlayers(state: SnakeNLadderStateModel) {
    return state.players;
  }

  @Selector()
  static getCurrentPlayer(state: SnakeNLadderStateModel) {
    return state.players[state.currentPlayerIndex];
  }

  @Selector()
  static getWinner(state: SnakeNLadderStateModel) {
    return state.players[state.winner];
  }

  @Action(AddPlayer)
  addPlayer({ getState, patchState }: StateContext<SnakeNLadderStateModel>, { payload }: AddPlayer) {
    const state = getState();
    if (payload) {
      patchState({
        players: [...state.players, payload]
      });
    }
  }

  @Action(RemovePlayer)
  removePlayer({ getState, patchState }: StateContext<SnakeNLadderStateModel>, { payload }: RemovePlayer) {
    patchState({
      players: getState().players.filter(a => a.name != payload)
    });
  }

  @Action(MakeMove)
  makeMove({ getState, patchState, dispatch }: StateContext<SnakeNLadderStateModel>, { payload }: MakeMove) {
    const state = getState();
    let won: boolean = false;
    let tunnelFound: boolean = false;
    let players = state.players.map((p, index) => {
      let nextPosition = p.currentPosition + payload;
      if (index === state.currentPlayerIndex && nextPosition <= 100) {
        p.currentPosition = nextPosition;
        if (p.currentPosition === 100) {
          won = true;
        }
        if (TunnelMap.has(p.currentPosition)) {
          tunnelFound = true;
        }
      }
      return p;
    });

    patchState({
      players: [...players]
    });
    won ? dispatch(new Won(state.currentPlayerIndex)) :( tunnelFound ? (dispatch(new Transport())): (dispatch(new NextPlayer())));
  }

  @Action(Transport)
  transport({ getState, patchState, dispatch }: StateContext<SnakeNLadderStateModel>) {
    const state = getState();
    console.log("GOT ",TunnelMap.get(state.players[state.currentPlayerIndex].currentPosition).type,"On the way ");
    let players = state.players.map((p, index) => {
      if (index === state.currentPlayerIndex ) {       
      p.currentPosition = TunnelMap.get(p.currentPosition).end;
      }
      return p;
    });

    patchState({
      players: [...players]
    });
    dispatch(new NextPlayer());
  }

  @Action(RoleDice)
  roleDice(ctx: StateContext<SnakeNLadderStateModel>) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log("Dice output => ", randomNumber);
    ctx.dispatch(new MakeMove(randomNumber));
  }

  @Action(NextPlayer)
  nextPlayer(ctx: StateContext<SnakeNLadderStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
    });
  }

  @Action(Won)
  playerWon(ctx: StateContext<SnakeNLadderStateModel>, { payload }: Won) {
    console.log("Player => ", ctx.getState().players[payload].name, " --- WINS !!!!");
    const state = ctx.getState();
    ctx.patchState({
      winner: payload
    });
  }
}
