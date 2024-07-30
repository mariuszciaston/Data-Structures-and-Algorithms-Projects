function definePossibleMoves() {
	const movementMap = new Map();
	const directions = [
		[-2, -1],
		[-2, 1],
		[-1, -2],
		[-1, 2],
		[1, -2],
		[1, 2],
		[2, -1],
		[2, 1],
	];

	for (let i = 0; i < 8; i += 1) {
		for (let j = 0; j < 8; j += 1) {
			const node = [i, j];
			const moves = [];

			directions.forEach(([x, y]) => {
				const newX = i + x;
				const newY = j + y;

				if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
					moves.push([newX, newY]);
				}
			});

			movementMap.set(node.toString(), moves);
		}
	}

	return movementMap;
}

const possibleMoves = definePossibleMoves()
// console.log(possibleMoves);

class Queue {
	constructor() {
		this.items = [];
	}

	enqueue(obj) {
		this.items.push(obj);
	}

	dequeue() {
		return this.items.shift();
	}

	isEmpty() {
		return this.items.length === 0;
	}
}

function knightMoves(start, finish) {
	
	function isOnBoard(point) {
		return point[0] >= 0 && point[0] <= 7 && point[1] >= 0 && point[1] <= 7;
	}

	if (!isOnBoard(start) || !isOnBoard(finish)) {
		console.log('Out of board');
		return;
	}

	const queue = new Queue();
	const visited = new Map();

	queue.enqueue([start, 0, [start]]);

	while (!queue.isEmpty()) {
		const [currentPos, steps, path] = queue.dequeue();
		const currentKey = currentPos.toString();

		if (currentKey === finish.toString()) {
			console.log(`You made it in ${steps} moves! Here's your path:`);
			path.forEach((pos) => console.log(pos));
			return;
		}

		if (!visited.has(currentKey)) {
			visited.set(currentKey, true);
			const moves = possibleMoves.get(currentKey);

			moves.forEach((move) => {
				const newPath = [...path, move];
				queue.enqueue([move, steps + 1, newPath]);
			});
		}
	}

	console.log('No path found');
}

knightMoves([0, 0], [7, 7]);
