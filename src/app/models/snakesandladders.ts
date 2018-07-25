import { Tunnel, TunnelTypes } from "./tunnel.model";

var TunnelMap = new Map<number, Tunnel>();

//adding ladders..
TunnelMap.set(8, { start: 8, end: 31, type: TunnelTypes.LADDER });
TunnelMap.set(15, { start: 15, end: 97, type: TunnelTypes.LADDER });
TunnelMap.set(23, { start: 23, end: 53, type: TunnelTypes.LADDER });
TunnelMap.set(42, { start: 42, end: 81, type: TunnelTypes.LADDER });
TunnelMap.set(66, { start: 66, end: 87, type: TunnelTypes.LADDER });
TunnelMap.set(72, { start: 72, end: 95, type: TunnelTypes.LADDER });

//adding snakes...

TunnelMap.set(24, { start: 24, end: 1, type: TunnelTypes.SNAKE });
TunnelMap.set(55, { start: 55, end: 13, type: TunnelTypes.SNAKE });
TunnelMap.set(23, { start: 23, end: 53, type: TunnelTypes.SNAKE });
TunnelMap.set(71, { start: 71, end: 29, type: TunnelTypes.SNAKE });
TunnelMap.set(88, { start: 88, end: 67, type: TunnelTypes.SNAKE });
TunnelMap.set(99, { start: 99, end: 6, type: TunnelTypes.SNAKE });

export { TunnelMap }
