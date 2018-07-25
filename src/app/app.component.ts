import { Component } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { SnakeNLadderState } from "./state/snakeNladder.state";
import { Observable } from "rxjs";
import { Player } from "./models/player.model";
import { RoleDice } from "./actions/snakeNladder.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  @Select(SnakeNLadderState.getPlayers) players$: Observable<Player[]>;
  @Select(SnakeNLadderState.getCurrentPlayer) currentPlayer$: Observable<Player>;
  @Select(SnakeNLadderState.getWinner) winner$: Observable<Player>;

  currentPlayerIndex$:Observable<number>

  constructor(private store: Store) {
    this.currentPlayerIndex$ = this.store.select(state => state.currentPlayerIndex)
  }

  roleDice() {
    this.store.dispatch(new RoleDice());
  }
}
