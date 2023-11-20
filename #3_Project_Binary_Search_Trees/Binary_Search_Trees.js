/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */

class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}

	height() {
		if (this === null) {
			return -1;
		}

		const leftHeight = this.left ? this.left.height() : -1;
		const rightHeight = this.right ? this.right.height() : -1;

		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth() {
		let depth = 0;
		let node = this;
		while (node.parent !== null) {
			depth += 1;
			node = node.parent;
		}
		return depth;
	}
}

class Tree {
	constructor(dataArray) {
		this.root = this.prepare(dataArray);
	}

	prepare(dataArray) {
		// Remove duplicates and sort the array
		const sortedArray = [...new Set(dataArray)].sort((a, b) => a - b);
		return this.buildTree(sortedArray, 0, sortedArray.length - 1);
	}

	buildTree(sortedArray, start, end, parent = null) {
		// Base case
		if (start > end) {
			return null;
		}

		// Find the middle and make it root
		const mid = Math.floor((start + end) / 2);
		const node = new Node(sortedArray[mid]);

		// Set parent
		node.parent = parent;

		// Construct the left and right subtrees
		node.left = this.buildTree(sortedArray, start, mid - 1, node);
		node.right = this.buildTree(sortedArray, mid + 1, end, node);

		return node;
	}

	insert(data) {
		const newNode = new Node(data);
		if (this.root === null) {
			this.root = newNode;
		} else {
			this.insertNode(this.root, newNode);
		}
	}

	insertNode(node, newNode) {
		if (newNode.data < node.data) {
			if (node.left === null) {
				node.left = newNode;
				newNode.parent = node;
			} else {
				this.insertNode(node.left, newNode);
			}
		} else if (node.right === null) {
			node.right = newNode;
			newNode.parent = node;
		} else {
			this.insertNode(node.right, newNode);
		}
	}

	delete(data) {
		this.root = this.deleteNode(this.root, data);
	}

	deleteNode(node, key) {
		if (node === null) {
			return null;
		}

		if (key < node.data) {
			node.left = this.deleteNode(node.left, key);
			return node;
		}
		if (key > node.data) {
			node.right = this.deleteNode(node.right, key);
			return node;
		}
		if (node.left === null && node.right === null) {
			node = null;
			return node;
		}
		if (node.left === null) {
			node = node.right;
			return node;
		}
		if (node.right === null) {
			node = node.left;
			return node;
		}

		const aux = this.findMinNode(node.right);
		node.data = aux.data;

		node.right = this.deleteNode(node.right, aux.data);
		return node;
	}

	findMinNode(node) {
		if (node.left === null) {
			return node;
		}
		return this.findMinNode(node.left);
	}

	find(data) {
		let current = this.root;
		while (current) {
			if (data === current.data) {
				return current;
			}
			if (data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return null;
	}

	levelOrder(callback = (node) => node.data) {
		const queue = [this.root];
		const result = [];

		while (queue.length > 0) {
			const node = queue.shift();
			result.push(callback(node));

			if (node.left !== null) {
				queue.push(node.left);
			}
			if (node.right !== null) {
				queue.push(node.right);
			}
		}

		return result;
	}

	inOrder(callback = (node) => node.data) {
		const result = [];
		this.inOrderTraverse(this.root, callback, result);
		return result;
	}

	inOrderTraverse(node, callback, result) {
		if (node !== null) {
			this.inOrderTraverse(node.left, callback, result);
			result.push(callback(node));
			this.inOrderTraverse(node.right, callback, result);
		}
	}

	preOrder(callback = (node) => node.data) {
		const result = [];
		this.preOrderTraverse(this.root, callback, result);
		return result;
	}

	preOrderTraverse(node, callback, result) {
		if (node !== null) {
			result.push(callback(node));
			this.preOrderTraverse(node.left, callback, result);
			this.preOrderTraverse(node.right, callback, result);
		}
	}

	postOrder(callback = (node) => node.data) {
		const result = [];
		this.postOrderTraverse(this.root, callback, result);
		return result;
	}

	postOrderTraverse(node, callback, result) {
		if (node !== null) {
			this.postOrderTraverse(node.left, callback, result);
			this.postOrderTraverse(node.right, callback, result);
			result.push(callback(node));
		}
	}

	isBalanced(node = this.root) {
		if (node === null) {
			return true;
		}

		const leftHeight = node.left ? node.left.height() : -1;
		const rightHeight = node.right ? node.right.height() : -1;

		if (Math.abs(leftHeight - rightHeight) > 1) {
			return false;
		}

		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	rebalance() {
		const nodes = this.inOrder();
		this.root = this.buildTree(nodes, 0, nodes.length - 1);
	}

	prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	};
}

// TEST ----------------------------------------
const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8]);
// const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(69);
tree.insert(9);
tree.insert(77);

tree.delete(69);

tree.find(4);

const levelOrderResult = tree.levelOrder();

// prints the data of all nodes in level order
console.log(`levelOrderResult: ${levelOrderResult}`);

// prints the data of all nodes in level order
// tree.levelOrder((node) => console.log(node.data));

console.log('----------------------------------------');

const inOrderResult = tree.inOrder();
console.log(`inOrderResult: ${inOrderResult}`); // prints the data of all nodes in in-order

const preOrderResult = tree.preOrder();
console.log(`preOrderResult: ${preOrderResult}`); // prints the data of all nodes in pre-order

const postOrderResult = tree.postOrder();
console.log(`postOrderResult: ${postOrderResult}`); // prints the data of all nodes in post-order

// tree.inOrder((node) => console.log(node.data));  // prints the data of all nodes in in-order
// tree.preOrder((node) => console.log(node.data));  // prints the data of all nodes in pre-order
// tree.postOrder((node) => console.log(node.data));  // prints the data of all nodes in post-order

console.log('----------------------------------------');

const height = tree.root.height();

// prints the height of the root node
console.log(`Height of the root node: ${height}`);

console.log('----------------------------------------');

const node = tree.find(77);
if (node !== null) {
	const depth = node.depth();
	console.log(`Depth of node with data 77: ${depth}`);
} else {
	console.log('Data not found in tree');
}

console.log('----------------------------------------');

// prints true if the tree is balanced, false otherwise
console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log('----------------------------------------');

console.log('BINARY SEARCH TREE: ');
tree.prettyPrint();
