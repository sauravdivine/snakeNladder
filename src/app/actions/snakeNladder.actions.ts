import { Player } from '../models/player.model';

export class AddPlayer {
    static readonly type = '[TUTORIAL] RoleDice';
    constructor(public payload: Player) {};
}

export class RemovePlayer {
    static readonly type = '[TUTORIAL] RoleDice';
    constructor(public payload: string) {};
}

export class RoleDice {
    static readonly type = '[TUTORIAL] RoleDice';
    constructor() {};
}

export class MakeMove {
    static readonly type = '[TUTORIAL] MakeMove';
    constructor(public payload: number) {};
}

export class Transport {
    static readonly type = '[TUTORIAL] Transport';
    constructor() {};
}

export class GotBitten {
    static readonly type = '[TUTORIAL] GotBitten';
    constructor(public payload: string) {};
}

export class NextPlayer {
    static readonly type = '[TUTORIAL] NextPlayer';
    constructor() {};
}

export class Won {
    static readonly type = '[TUTORIAL] Won';
    constructor(public payload: number) {};
}