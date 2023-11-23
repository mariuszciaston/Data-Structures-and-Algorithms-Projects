/* eslint-disable no-param-reassign */

const Node = (data = null, left = null, right = null) => {
	const nodeObj = {
		data,
		left,
		right,
		height() {
			if (this === null) {
				return -1;
			}

			const leftHeight = this.left ? this.left.height() : -1;
			const rightHeight = this.right ? this.right.height() : -1;

			return Math.max(leftHeight, rightHeight) + 1;
		},
		depth() {
			let depth = 0;
			let node = this;
			while (node.parent !== null) {
				depth += 1;
				node = node.parent;
			}
			return depth;
		},
	};

	return nodeObj;
};

const Tree = (dataArray) => {
	const buildTree = (sortedArray, start, end, parent = null) => {
		if (start > end) {
			return null;
		}

		const mid = Math.floor((start + end) / 2);
		const node = Node(sortedArray[mid]);

		node.parent = parent;

		node.left = buildTree(sortedArray, start, mid - 1, node);
		node.right = buildTree(sortedArray, mid + 1, end, node);

		return node;
	};

	const prepare = (array) => {
		const sortedArray = [...new Set(array)].sort((a, b) => a - b);
		return buildTree(sortedArray, 0, sortedArray.length - 1);
	};

	let root = prepare(dataArray);

	const insertNode = (node, newNode) => {
		const direction = newNode.data < node.data ? 'left' : 'right';
		if (node[direction] === null) {
			node[direction] = newNode;
			newNode.parent = node;
		} else {
			insertNode(node[direction], newNode);
		}
	};

	const insert = (data) => {
		const newNode = Node(data);
		if (root === null) {
			root = newNode;
		} else {
			insertNode(root, newNode);
		}
	};

	const findMinNode = (node) => {
		if (node.left === null) {
			return node;
		}
		return findMinNode(node.left);
	};

	const deleteNode = (node, key) => {
		if (node === null) {
			return null;
		}

		if (key < node.data) {
			node.left = deleteNode(node.left, key);
			return node;
		}

		if (key > node.data) {
			node.right = deleteNode(node.right, key);
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

		const aux = findMinNode(node.right);
		node.data = aux.data;

		node.right = deleteNode(node.right, aux.data);
		return node;
	};

	const find = (data) => {
		let current = root;
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
	};

	const levelOrder = () => {
		const queue = [root];
		const result = [];

		while (queue.length > 0) {
			const node = queue.shift();
			result.push(node.data);

			if (node.left !== null) {
				queue.push(node.left);
			}
			if (node.right !== null) {
				queue.push(node.right);
			}
		}
		return result;
	};

	const inOrderTraverse = (node, result) => {
		if (node !== null) {
			inOrderTraverse(node.left, result);
			result.push(node.data);
			inOrderTraverse(node.right, result);
		}
	};

	const inOrder = () => {
		const result = [];
		inOrderTraverse(root, result);
		return result;
	};

	const preOrderTraverse = (node, result) => {
		if (node !== null) {
			result.push(node.data);
			preOrderTraverse(node.left, result);
			preOrderTraverse(node.right, result);
		}
	};
	const preOrder = () => {
		const result = [];
		preOrderTraverse(root, result);
		return result;
	};

	const postOrderTraverse = (node, result) => {
		if (node !== null) {
			postOrderTraverse(node.left, result);
			postOrderTraverse(node.right, result);
			result.push(node.data);
		}
	};

	const postOrder = () => {
		const result = [];
		postOrderTraverse(root, result);
		return result;
	};
	const isBalanced = (node = root) => {
		if (node === null) {
			return true;
		}

		const leftHeight = node.left ? node.left.height() : -1;
		const rightHeight = node.right ? node.right.height() : -1;

		if (Math.abs(leftHeight - rightHeight) > 1) {
			return false;
		}

		return isBalanced(node.left) && isBalanced(node.right);
	};

	const rebalance = () => {
		const nodes = inOrder();
		root = buildTree(nodes, 0, nodes.length - 1);
	};

	const prettyPrint = (node = root, prefix = '', isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	};

	return {
		root,
		insert,
		delete: (data) => {
			root = deleteNode(root, data);
		},
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		isBalanced,
		rebalance,
		prettyPrint,
	};
};

// TEST ----------------------------------------
const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);

tree.insert(9);
tree.delete(9);

// prints the data of all nodes in level order
console.log(`levelOrderResult / BFS (Breadth-First Search): ${tree.levelOrder()}`);

// prints the data of all nodes in level order
// tree.levelOrder((node) => console.log(node.data));

console.log(`inOrderResult: ${tree.inOrder()}`);
console.log(`preOrderResult / DFS (Depth-First Search): ${tree.preOrder()}`);
console.log(`postOrderResult / DFS (Depth-First Search) - REVERSE: ${tree.postOrder()}`);

// tree.inOrder((node) => console.log(node.data));
// tree.preOrder((node) => console.log(node.data));
// tree.postOrder((node) => console.log(node.data));

console.log('----------------------------------------');

const height = tree.root.height();

// prints the height of the root node
console.log(`Height of the root node: ${height}`);

const node = tree.find(3);
if (node !== null) {
	const depth = node.depth();
	console.log(`Depth of node with data '3': ${depth}`);
} else {
	console.log('Data not found in tree');
}

// prints true if the tree is balanced, false otherwise
console.log(`isBalanced: ${tree.isBalanced()}`);

console.log('----------------------------------------');

console.log('BINARY SEARCH TREE: ');
tree.prettyPrint();

console.log('');
console.log('########################################');
console.log('');

// DRIVER SCRIPT ----------------------------------------

// 1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
console.log(`Create a binary search tree from an array of random numbers < 100: `);

console.log('----------------------------------------');

function randomNumbers() {
	const array = [];
	for (let i = 0; i < 100; i += 1) {
		array.push(Math.floor(Math.random() * 100));
	}
	return array;
}

console.log(`randomNumbers: ${randomNumbers()}`);

const tree2 = Tree(randomNumbers());

console.log('----------------------------------------');

// 2. Confirm that the tree is balanced by calling isBalanced.
console.log(`isBalanced: ${tree2.isBalanced()}`);

console.log('----------------------------------------');
// 3. Print out all elements in level, pre, post, and in order.
console.log(`levelOrderResult / BFS (Breadth-First Search): ${tree2.levelOrder()}`);
console.log(`inOrderResult: ${tree2.inOrder()}`); //
console.log(`preOrderResult / DFS (Depth-First Search): ${tree2.preOrder()}`); // prints the data of all nodes in pre-order
console.log(`postOrderResult / DFS (Depth-First Search) - REVERSE: ${tree2.postOrder()}`); // prints the data of all nodes in post-order
console.log('----------------------------------------');

// 4. Unbalance the tree by adding several numbers > 100.
console.log(`***adding several numbers > 100 to unbalance the tree***`);
tree2.insert(100);
tree2.insert(200);
tree2.insert(300);
tree2.insert(400);

// 5. Confirm that the tree is unbalanced by calling isBalanced.
console.log(`isBalanced: ${tree2.isBalanced()}`);

// 6. Balance the tree by calling rebalance.
console.log(`***rebalance:***`);
tree2.rebalance();

// 7. Confirm that the tree is balanced by calling isBalanced.
console.log(`isBalanced: ${tree2.isBalanced()}`);

// 8. Print out all elements in level, pre, post, and in order.

console.log('----------------------------------------');
// 8. Print out all elements in level, pre, post, and in order.
console.log(`levelOrderResult / BFS (Breadth-First Search): ${tree2.levelOrder()}`);
console.log(`inOrderResult: ${tree2.inOrder()}`); //
console.log(`preOrderResult / DFS (Depth-First Search): ${tree2.preOrder()}`);
console.log(`postOrderResult / DFS (Depth-First Search) - REVERSE: ${tree2.postOrder()}`);
console.log('----------------------------------------');

console.log('BINARY SEARCH TREE: ');
tree2.prettyPrint();
