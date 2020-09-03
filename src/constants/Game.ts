export const SHIP_SIZE = 10;
export const PROBE_SIZE = 5;
export const DOOR_SIZE = 25;
export const MOON_GATE_SIZE = 40;
export const FONT_SIZE = 20;
export const FUEL_AMOUNT = 1000;
export const GAME_WIDTH = 1080;
export const GAME_HEIGHT = 602;

export const WIDTH = 250;
export const HEIGHT = 275;
export const WIDTH_WITH_GAP = WIDTH + 10;
export const HEIGHT_WITH_GAP = HEIGHT + 25;
export const PADDING = 10;

export const ships: Coords[] = [
	[PADDING, 5],
	[PADDING, 50],
	[PADDING, 95]
];

export const probes: Coords[] = [
	[ships[0][0] + SHIP_SIZE, ships[0][1]],
	[ships[1][0] + SHIP_SIZE, ships[1][1]],
	[ships[2][0] + SHIP_SIZE, ships[2][1]]
];
