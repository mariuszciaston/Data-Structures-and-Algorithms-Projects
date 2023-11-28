// 1. Define board. Think about the rules of the board and knight, and make sure to follow them.
const emptyBoard = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

console.log(emptyBoard);

// 2. Define possible moves. For every square there is a number of possible moves, choose a data structure that will allow you to work with them. Don’t allow any moves to go off the board.
// 3. Define how knight can move (4 directions = max 8 posible moves)

function createKnightMoves() {
	const knightMoves = new Map();
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

			knightMoves.set(JSON.stringify(node), moves);
		}
	}

	return knightMoves;
}

const possibleMoves = createKnightMoves();
console.log(possibleMoves);

// 4. Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:

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

function doBFS(graph, source) {
	const bfsInfo = [];

	for (let i = 0; i < graph.length; i += 1) {
		bfsInfo[i] = {
			distance: null,
			predecessor: null,
		};
	}

	bfsInfo[source].distance = 0;

	const queue = new Queue();
	queue.enqueue(source);

	while (!queue.isEmpty()) {
		const currentVertex = queue.dequeue();

		for (let i = 0; i < graph[currentVertex].length; i += 1) {
			const adjacentVertex = graph[currentVertex][i];

			if (bfsInfo[adjacentVertex].distance === null) {
				bfsInfo[adjacentVertex].distance = bfsInfo[currentVertex].distance + 1;
				bfsInfo[adjacentVertex].predecessor = currentVertex;
				queue.enqueue(adjacentVertex);
			}
		}
	}

	return bfsInfo;
}

// function knightMoves(start, finish) {

// }

// console.log(knightMoves([0, 0], [3, 3]));
