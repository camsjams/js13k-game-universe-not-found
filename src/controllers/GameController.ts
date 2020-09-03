import {
	ships, PADDING, probes, SHIP_SIZE, PROBE_SIZE, WIDTH_WITH_GAP, HEIGHT_WITH_GAP, WIDTH, HEIGHT
} from '../constants/Game';

let currentPlayer: Player | undefined = undefined;
let currentLevel: Level | undefined = undefined;
let currentUniverse: Universe | undefined = undefined;

// const LEVEL_UNI_MAP = [
// 	[
// 		'\u03A0',
// 		'\u03A1',
// 		'\u03A3',
// 		'\u03A4',
// 		'\u03A5',
// 		'\u03A6'
// 	],
// 	[
// 		'\u03B0',
// 		'\u03B1',
// 		'\u03B2',
// 		'\u03B3',
// 		'\u03B4',
// 		'\u03B5'
// 	],
// 	[
// 		'\u03C0',
// 		'\u03C1',
// 		'\u03C2',
// 		'\u03C3',
// 		'\u03C4',
// 		'\u03C5'
// 	]
// ];

const levels: Levels = [
	[
		{
			x: 0,
			y: 0,
			name: '\u03A0',
			active: true,
			doors: [
				[WIDTH - PADDING, PADDING, 2],
				[WIDTH - PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: 0,
			name: '\u03A1',
			doors: [
				[WIDTH - PADDING, HEIGHT - PADDING, 5],
				[PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: 0,
			name: '\u03A3',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT - PADDING, 4]
			]
		},
		{
			x: 0,
			y: HEIGHT_WITH_GAP,
			name: '\u03A4',
			doors: [
				[WIDTH - PADDING, PADDING, 1],
				[WIDTH - PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: HEIGHT_WITH_GAP,
			name: '\u03A5',
			doors: [
				[WIDTH - PADDING, HEIGHT - PADDING, 3],
				[PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: HEIGHT_WITH_GAP,
			name: '\u03A6',
			doors: []
		}
	],
	[
		{
			x: 0,
			y: 0,
			name: '\u03B0',
			active: true,
			doors: [
				[WIDTH - PADDING, PADDING, -1],
				[WIDTH - PADDING, 200, 4],
				[0, 170, 4]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: 0,
			name: '\u03B1',
			doors: []
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: 0,
			name: '\u03B2',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT - PADDING, 1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 3,
			y: 0,
			name: '\u03B3',
			doors: [
				[WIDTH - PADDING, HEIGHT - PADDING, 5]
			]
		},
		{
			x: 0,
			y: HEIGHT_WITH_GAP,
			name: '\u03B7',
			doors: [
				[WIDTH - PADDING, 10, -1],
				[WIDTH - PADDING, 50, 3],
				[WIDTH - PADDING, 100, -1],
				[WIDTH - PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: HEIGHT_WITH_GAP,
			name: '\u03B4',
			doors: [
				[WIDTH - PADDING, HEIGHT - PADDING, 6],
				[PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: HEIGHT_WITH_GAP,
			name: '\u03B6',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT - PADDING, 7]
			]
		},
		{
			x: WIDTH_WITH_GAP * 3,
			y: HEIGHT_WITH_GAP,
			name: '\u03B5',
			doors: [
				[WIDTH - PADDING, 50, -1],
				[WIDTH - PADDING, 150, 2]
			]
		}
	]
];

const getPlayer = (): Player | undefined => {
	const probe = probes.pop();
	if (probe) {
		return [probe[0], probe[1], PROBE_SIZE, 'rgba(0,255,0,0.5)'];
	}

	const ship = ships.pop();
	if (ship) {
		return [ship[0], ship[1], SHIP_SIZE, 'rgba(34,100,140,0.9)'];
	}
};

const getCurrentLevel = (): Level | undefined => {
	const nextLevel = levels.shift();
	return nextLevel;
};

export const getContext = (): GameContext => {
	if (!currentPlayer) {
		currentPlayer = getPlayer();
	}

	if (!currentLevel) {
		currentLevel = getCurrentLevel();
		currentUniverse = currentUniverse ?
			currentUniverse :
			currentLevel ?
				currentLevel[0] :
				undefined;
	}

	return {
		player: currentPlayer,
		level: currentLevel,
		universe: currentUniverse
	};
};

export const reset = (): void => {
	currentPlayer = undefined;
	currentLevel = undefined;
	currentUniverse = undefined;
};

export const goToUniverse = (nextIndex: number): Universe | undefined => {
	if (currentLevel && currentLevel[nextIndex]) {
		currentLevel[nextIndex].active = true;
		currentUniverse = currentLevel[nextIndex];

		return currentUniverse;
	}
};

export const destroyActivePlayer = (): void => {
	if (currentLevel) {
		currentLevel = currentLevel.map((u, i) => {
			if (i !== 0) {
				u.active = false;
			}

			return u;
		});

		currentUniverse = currentLevel[0];
	}

	currentPlayer = undefined;
};

export const goToNextLevel = (): void => {
	currentLevel = getCurrentLevel();
	currentUniverse = currentLevel ?
		currentLevel[0] :
		undefined;
};
