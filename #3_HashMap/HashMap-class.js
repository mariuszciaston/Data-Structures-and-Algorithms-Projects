/* eslint-disable max-classes-per-file */

class Node {
	constructor(value = null, nextNode = null) {
		this.value = value;
		this.nextNode = nextNode;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	append(value) {
		const newNode = new Node(value);
		this.size += 1;

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.nextNode = newNode;
			this.tail = newNode;
		}
	}
}

class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.buckets = new Array(this.capacity).fill(null);
		this.threshold = capacity * loadFactor;
	}

	// resize() {
	// 	if (this.length() >= this.threshold) {
	// 		const newCapacity = this.capacity * 2;
	// 		const newBuckets = new Array(newCapacity).fill(null);
	// 		this.capacity = newCapacity;

	// 		this.buckets.forEach((bucket) => {
	// 			if (bucket !== null) {
	// 				const index = this.hash(bucket.head.value.key);
	// 				newBuckets[index] = bucket;
	// 			}
	// 		});

	// 		this.buckets = newBuckets;
	// 		this.threshold = newCapacity * this.loadFactor;
	// 	} else if (this.length() < this.threshold) {
	// 		const newCapacity = Math.max(16, Math.floor(this.capacity / 2));
	// 		const newBuckets = new Array(newCapacity).fill(null);
	// 		this.capacity = newCapacity;

	// 		this.buckets.forEach((bucket) => {
	// 			if (bucket !== null) {
	// 				const index = this.hash(bucket.head.value.key);
	// 				newBuckets[index] = bucket;
	// 			}
	// 		});

	// 		this.buckets = newBuckets;
	// 		this.threshold = newCapacity * this.loadFactor;
	// 	}
	// }

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i += 1) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	checkIndexBounds(index) {
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}
	}

	set(key, value) {
		const index = this.hash(key);
		this.checkIndexBounds(index);

		if (this.buckets[index] === null) {
			this.buckets[index] = new LinkedList();
		}

		if (this.buckets[index].head?.value.key === key) {
			this.buckets[index].head.value.value = value;
		} else {
			this.buckets[index].append({ key, value });
		}
		// this.resize();
	}

	get(key) {
		const index = this.hash(key);
		this.checkIndexBounds(index);
		return this.buckets[index]?.head.value.value || null;
	}

	has(key) {
		const index = this.hash(key);
		this.checkIndexBounds(index);
		return this.buckets[index]?.head.value.key === key;
	}

	remove(key) {
		// Remove method needs to be fixed
		const index = this.hash(key);
		this.checkIndexBounds(index);

		if (this.buckets[index]?.head.value.key === key) {
			this.buckets[index] = null;
			// this.resize();
			return true;
		}
		return false;
	}

	length() {
		return this.buckets.filter((bucket) => bucket !== null).length;
	}

	clear() {
		this.buckets.fill(null);
		// this.resize();
		return true;
	}

	keys() {
		const result = [];

		this.buckets.forEach((bucket) => {
			let currentNode = bucket?.head;
			while (currentNode) {
				result.push(currentNode.value.key);
				currentNode = currentNode.nextNode;
			}
		});

		return result;
	}

	values() {
		const result = [];

		this.buckets.forEach((bucket) => {
			let currentNode = bucket?.head;
			while (currentNode) {
				result.push(currentNode.value.value);
				currentNode = currentNode.nextNode;
			}
		});

		return result;
	}

	entries() {
		const result = [];

		this.buckets.forEach((bucket) => {
			let currentNode = bucket?.head;
			while (currentNode) {
				result.push([currentNode.value.key, currentNode.value.value]);
				currentNode = currentNode.nextNode;
			}
		});

		return result;
	}
}

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');
test.set('A', '1');
test.set('B', '2');
test.set('C', '3');
test.set('D', '4');
test.set('E', '5');

// test.set('F', '6');

console.log('Length:', test.length());
console.log('Get:', test.get('apple'));
console.log('Has:', test.has('apple'));
// console.log('Remove:', test.remove('elephant'));
console.log('Has:', test.has('apple'));
console.log('Length:', test.length());
// console.log('Clear:', test.clear());
// console.log('Length:', test.length());
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Entries:', test.entries());

console.log(test.buckets);

console.log('-----------------');
console.log('Length:', test.length());
console.log('Threshold:', test.threshold);
console.log('Capacity:', test.capacity);
