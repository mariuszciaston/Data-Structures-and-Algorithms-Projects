// Assignment 1

// Using iteration, write a function fibs which takes a number and returns an array containing that many numbers from the fibonacci sequence. Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].

// Now write another function fibsRec which solves the same problem recursively. This can be done in just a couple of lines (or 1 if you’re crazy, but don’t consider either of these lengths a requirement… just get it done).

// F0	F1	F2	F3	F4	F5	F6	F7	F8	F9	F10	F11	F12	F13	F14	F15	F16	F17	 F18  F19
// 0	1	1	2	3	5	8	13	21	34	55	89	144	233	377	610	987	1597 2584 4181

function fibonacciIteration(n) {
	const array = [];

	if (n <= 0) {
		return 0;
	}

	if (n === 1) {
		return 1;
	}

	let first = 0;
	let second = 1;
	let next;

	array.push(first, second);

	for (let i = 2; i < n; i += 1) {
		next = first + second;
		first = second;
		second = next;
		array.push(next);
	}
	return array;
}

console.log(`fibonacciIteration: ${fibonacciIteration(8)}`);

// -----------------------------------------------------

function fibonacciRecursion(n, array = [0, 1]) {
	if (n <= 0) {
		return [];
	}

	if (n === 1) {
		return [0];
	}

	if (n === 2) {
		return array;
	}

	array.push(array[array.length - 1] + array[array.length - 2]);

	if (array.length === n) {
		return array;
	}

	return fibonacciRecursion(n, array);
}

console.log(`fibonacciRecursion: ${fibonacciRecursion(8)}`);
