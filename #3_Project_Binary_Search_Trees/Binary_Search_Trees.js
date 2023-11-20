/* eslint-disable max-classes-per-file */

const arrayOfData = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// const arrayOfData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function merge(left, right) {
	const sortedArray = [];
	let indexLeft = 0;
	let indexRight = 0;

	while (indexLeft < left.length && indexRight < right.length) {
		if (left[indexLeft] < right[indexRight]) {
			sortedArray.push(left[indexLeft]);
			indexLeft += 1;
		} else {
			sortedArray.push(right[indexRight]);
			indexRight += 1;
		}
	}

	const remainingLeft = left.slice(indexLeft);
	const remainingRight = right.slice(indexRight);

	return sortedArray.concat(remainingLeft).concat(remainingRight);
}

function mergeSort(array) {
	if (array.length < 2) {
		return array;
	}

	const middle = Math.ceil(array.length / 2);
	let left = array.slice(0, middle);
	let right = array.slice(middle);
	left = mergeSort(left);
	right = mergeSort(right);

	return merge(left, right);
}

function removeDuplicates(data) {
	return Array.from(new Set(data));
}

const withoutDuplicates = removeDuplicates(arrayOfData);
const sortedArray = mergeSort(withoutDuplicates);

console.log(`arrayOfData: ${arrayOfData}`);
console.log(`withoutDuplicates: ${withoutDuplicates}`);
console.log(`sortedArray: ${sortedArray}`);
console.log('----------------------------------------');

class Node {
	constructor(data) {
		this.data = data;
		this.leftChild = null;
		this.rightChild = null;
	}
}

// function to convert the array to BST and return the root of the created tree
function buildTree(array) {
	// if the array is empty return NULL
	if (array.length === 0) {
		return null;
	}

	let mid = Math.floor(array.length / 2);
	const root = new Node(array[mid]);

	// initializing queue
	const queue = [
		[root, [0, mid - 1]],
		[root, [mid + 1, array.length - 1]],
	];

	while (queue.length > 0) {
		const [parent, [leftChild, rightChild]] = queue.shift();

		// if there are elements to process and parent node is not NULL
		if (leftChild <= rightChild && parent != null) {
			mid = Math.floor((leftChild + rightChild) / 2);
			const child = new Node(array[mid]);

			// set the child node as left or right child of the parent node
			if (array[mid] < parent.data) {
				parent.leftChild = child;
			} else {
				parent.rightChild = child;
			}

			// push the left and right child and their indices to the queue
			queue.push([child, [leftChild, mid - 1]]);
			queue.push([child, [mid + 1, rightChild]]);
		}
	}

	return root;
}

// function to print the preorder traversal of the constructed BST
function printBST(root) {
	if (root === null) {
		return;
	}
	console.log(`${root.data} `);
	printBST(root.leftChild);
	printBST(root.rightChild);
}

// function to print the whole BST visually
const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.rightChild !== null) {
		prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	if (node.leftChild !== null) {
		prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

printBST(buildTree(sortedArray));
console.log('----------------------------------------');
prettyPrint(buildTree(sortedArray));
