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

// 2. Define possible moves. For every square there is a number of possible moves, choose a data structure that will allow you to work with them. Don’t allow any moves to go off the board.

function createEdgeList() {
	const edgeList = [];
	for (let i = 0; i < 8; i += 1) {
		for (let j = 0; j < 8; j += 1) {
			if (i > 0) {
				edgeList.push([
					[i, j],
					[i - 1, j],
				]); // Up
			}
			if (i < 7) {
				edgeList.push([
					[i, j],
					[i + 1, j],
				]); // Down
			}
			if (j > 0) {
				edgeList.push([
					[i, j],
					[i, j - 1],
				]); // Left
			}
			if (j < 7) {
				edgeList.push([
					[i, j],
					[i, j + 1],
				]); // Right
			}
		}
	}
	return edgeList;
}

console.log(createEdgeList());

// 3. Define how knight can move (4 directions = max 8 posible moves)

// 4. Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series. Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square. Output what that full path looks like, e.g.:

// knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]]
// or
// knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]

// > knightMoves([3,3],[4,3])
//   => You made it in 3 moves!  Here's your path:
//     [3,3]
//     [4,5]
//     [2,4]
//     [4,3]

// ---------------------------------------------------------------------

// function knightMoves(start, finish) {
// 	// const move = () => {
// 	// }
// }

// const adjMatrixStart = [
// 	[1, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// ];

// const adjMatrixFinish = [
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 1, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// 	[0, 0, 0, 0, 0, 0, 0, 0],
// ];

// function convertToEdgeList(adjMatrix, edgeList = []) {
// 	for (let i = 0; i < adjMatrix.length; i += 1) {
// 		for (let j = 0; j < adjMatrix[i].length; j += 1) {
// 			if (adjMatrix[i][j] === 1) {
// 				edgeList.push([i, j]);
// 			}
// 		}
// 	}
// 	return edgeList;
// }

// const edgeListStart = convertToEdgeList(adjMatrixStart);
// const edgeListEnd = convertToEdgeList(adjMatrixFinish);

// console.log(edgeListStart);
// console.log(edgeListEnd);

// // console.log(knightMoves([0,0],[3,3]));

// knightMoves([0, 0], [3, 3]);
