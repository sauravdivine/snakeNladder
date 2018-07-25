export enum TunnelTypes {
  SNAKE = "snake",
  LADDER = "ladder"
}

export interface Tunnel {
  start: number;
  end: number;
  type: TunnelTypes;
}
