import {PADDING, WIDTH_WITH_GAP, HEIGHT_WITH_GAP, WIDTH, HEIGHT} from '../constants/Game';

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
				[WIDTH - PADDING, HEIGHT / 2, 5],
				[PADDING / 3, 100, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: 0,
			name: '\u03A3',
			doors: [
				[-PADDING / 2, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT * .7, 4]
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
				[WIDTH - PADDING, HEIGHT * .45, -1],
				[PADDING, HEIGHT * .7, 3]
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
				[145, HEIGHT * .75, 1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 3,
			y: 0,
			name: '\u03B3',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT * .8, 5]
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
				[WIDTH - PADDING, HEIGHT * .66, -1],
				[123, 200, 6]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: HEIGHT_WITH_GAP,
			name: '\u03B6',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, 7],
				[WIDTH - PADDING, HEIGHT * .1, -1]
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
	],
	[
		{
			x: 0,
			y: 0,
			name: '\u03B0\u03C0',
			active: true,
			doors: [
				[WIDTH - PADDING, PADDING, -1],
				[0, HEIGHT * .9, 4]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: 0,
			name: '\u03C0',
			doors: [
				[WIDTH - PADDING, 0, 6],
				[WIDTH - PADDING, 30, -1],
				[WIDTH - PADDING, 70, 3],
				[WIDTH - PADDING, 100, 0],
				[WIDTH - PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: 0,
			name: '\u03C3',
			doors: [
				[PADDING + PADDING, PADDING + PADDING, -1],
				[WIDTH - PADDING, HEIGHT * .8, 1]
			]
		},
		{
			x: WIDTH_WITH_GAP * 3,
			y: 0,
			name: '\u03C2',
			doors: [
				[WIDTH - PADDING, HEIGHT * .15, 2]
			]
		},
		{
			x: 0,
			y: HEIGHT_WITH_GAP,
			name: '\u03C4',
			doors: [
				[0, 200, 3],
				[WIDTH - PADDING, 200, -1]
			]
		},
		{
			x: WIDTH_WITH_GAP,
			y: HEIGHT_WITH_GAP,
			name: '\u03C5',
			doors: []
		},
		{
			x: WIDTH_WITH_GAP * 2,
			y: HEIGHT_WITH_GAP,
			name: '\u03B6\u03C5\u03C5',
			doors: [
				[25, 0, -1],
				[WIDTH - PADDING, HEIGHT * .1, 7]
			]
		},
		{
			x: WIDTH_WITH_GAP * 3,
			y: HEIGHT_WITH_GAP,
			name: '\u03C6',
			doors: [
				[156, 50, -1],
				[186, 50, 2],
				[216, 50, 5]
			]
		}
	]
];

export default levels;
