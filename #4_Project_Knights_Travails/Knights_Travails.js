// Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

// Think about the rules of the board and knight, and make sure to follow them.

// For every square there is a number of possible moves, choose a data structure that will allow you to work with them. Don’t allow any moves to go off the board.

// Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series.

// Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:

function knightMoves(start, finish) {
	// const move = () => {
	// }
}

const adjMatrixStart = [
	[1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

const adjMatrixFinish = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

function convertToEdgeList(adjMatrix, edgeList = []) {
	for (let i = 0; i < adjMatrix.length; i += 1) {
		for (let j = 0; j < adjMatrix[i].length; j += 1) {
			if (adjMatrix[i][j] === 1) {
				edgeList.push([i, j]);
			}
		}
	}
	return edgeList;
}

const edgeListStart = convertToEdgeList(adjMatrixStart);
const edgeListEnd = convertToEdgeList(adjMatrixFinish);

console.log(edgeListStart);
console.log(edgeListEnd);

// knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]]
// or
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]

// console.log(knightMoves([0,0],[3,3]));

knightMoves([0, 0], [3, 3]);
