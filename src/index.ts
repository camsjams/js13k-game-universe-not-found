import {
	getContext,
	reset as resetGame,
	goToUniverse,
	destroyActivePlayer,
	goToNextLevel
} from './controllers/GameController';
import updatePlayer, {render as renderPlayer} from './controllers/PlayerController';
import {checkCollisions} from './components/Door';
import {checkCollisions as onEnterMoonGate} from './components/MoonGate';
import {render as renderShips} from './components/Ship';
import {render as renderProbes} from './components/Probe';
import {render as renderUniverses} from './components/Universe';
import {ships, probes, PROBE_SIZE, FUEL_AMOUNT, GAME_HEIGHT, GAME_WIDTH, WIDTH, HEIGHT} from './constants/Game';

let lastTime = 0;
let fuelLeft = FUEL_AMOUNT;

const $score = document.getElementById('s') as HTMLElement;
const $time = document.getElementById('t') as HTMLElement;
const $message = document.getElementById('m') as HTMLElement;
const $log = document.getElementById('l') as HTMLElement;
const $g = document.getElementById('g') as HTMLElement;

const canvas: HTMLCanvasElement = document.createElement('canvas');
$g.appendChild(canvas);

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const $ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const capLog: CaptainsLog = (message: string, isGarbledTime?: boolean): void => {
	$log.prepend(`[${isGarbledTime ? '??:??:?? ::' : new Date().toLocaleTimeString()}]: ${message}\n`);
};

function resetPlayerToUniverse(player: Player, universe: Universe): void {
	player[0] = (universe.x + WIDTH) / 2;
	player[1] = (universe.y + HEIGHT) / 2;

	if (!universe.doors.length) {
		capLog('A Moon Gate! Should we enter it?');
	}
}

function checkBoundaries(player: Player, universe: Universe): void {
	const MAX_WIDTH = universe.x + WIDTH - PROBE_SIZE;
	const MAX_HEIGHT = universe.y + HEIGHT - PROBE_SIZE;
	if (player[0] < universe.x) {
		player[0] = universe.x;
	} else if (player[0] > MAX_WIDTH) {
		player[0] = MAX_WIDTH;
	}

	if (player[1] < universe.y) {
		player[1] = universe.y;
	} else if (player[1] > MAX_HEIGHT) {
		player[1] = MAX_HEIGHT;
	}
}

function checkDoors(player: Player, universe: Universe): boolean {
	const doorEntered = checkCollisions(universe, player);
	if (doorEntered) {
		if (doorEntered[2] > -1) {
			const nextUniverse = goToUniverse(doorEntered[2]);
			if (nextUniverse) {
				resetPlayerToUniverse(player, nextUniverse);
			}
		} else {
			fuelLeft = FUEL_AMOUNT;
			destroyActivePlayer();
			return true;
		}
	}

	return false;
}

function handleMoonGateEntry(player: Player) {
	goToNextLevel();
	capLog('Moon Gate Entered');
	capLog('----', true);
	capLog('We have entered into a new Mother Universe!', true);
	capLog('Calibrated sensors to new time vortex');
	fuelLeft = FUEL_AMOUNT;
	player[0] = WIDTH / 2;
	player[1] = HEIGHT / 2;
}

function updatePlayerData(timeDifference: number, player: Player, universe: Universe): boolean {
	const vel = updatePlayer(timeDifference);
	player[0] += vel[0];
	player[1] += vel[1];

	checkBoundaries(player, universe);
	const wasDestroyed = checkDoors(player, universe);
	if (onEnterMoonGate(universe, player)) {
		handleMoonGateEntry(player);
		return true;
	}

	fuelLeft -= (Math.abs(vel[0]) + Math.abs(vel[1])) * .5;
	return wasDestroyed;
}

const smartUpdate = (value: string, ele: HTMLElement): void => {
	if (value !== ele.innerHTML) {
		ele.innerHTML = value;
	}
};

function update(timeDifference: number, game: GameContext): boolean {
	let wasDestroyed = false;
	if (game.player && game.universe) {
		fuelLeft -= timeDifference * .25;
		wasDestroyed = updatePlayerData(timeDifference, game.player, game.universe);
	}

	smartUpdate(`<b>Fuel:</b> ${~~fuelLeft}`, $time);
	smartUpdate(`<b>Survivors:</b> ${ships.length * 100}`, $score);
	smartUpdate(
		`<b>Status:</b>
		Exploring <i>Level ${game.levelNum}</i> |
		 ${ships.length} <i>ships left</i> | ${probes.length} <i>probes left</i>`,
		$message);

	if (wasDestroyed && game.levelNum === getContext().levelNum) {
		capLog('Vessel Lost');
	}

	return wasDestroyed;
}

function render(game: GameContext): void {
	if (game.level) {
		renderUniverses($ctx, game.level);
		renderShips($ctx, ships);
		renderProbes($ctx, probes);
	}

	if (game.player) {
		renderPlayer($ctx, game.player);
	}
}

function loop(): void {
	const now = Date.now();
	const timeDifference = (now - lastTime) / 1000.0;
	const game = getContext();
	if (update(timeDifference, game)) {
		lastTime = now;
		requestAnimationFrame(loop);
		$ctx.clearRect(0, 0, canvas.width, canvas.height);
		return;
	}

	if (!game.player) {
		$g.innerHTML = '<div class="over"><h2>Game Over</h2></div>';
		return;
	}

	render(game);
	lastTime = now;
	requestAnimationFrame(loop);
}

function reset(): void {
	fuelLeft = FUEL_AMOUNT;
	resetGame();
}

((): void => {
	reset();
	lastTime = Date.now();
	loop();
})();
