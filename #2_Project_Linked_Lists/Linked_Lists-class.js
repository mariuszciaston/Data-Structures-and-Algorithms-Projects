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

	prepend(value) {
		const newNode = new Node(value);
		this.size += 1;

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			const temp = this.head;
			this.head = newNode;
			this.head.nextNode = temp;
		}
	}

	getSize() {
		return this.size;
	}

	getHead() {
		return this.head;
	}

	getTail() {
		return this.tail;
	}

	at(index) {
		if (this.head === null) {
			return null;
		}

		let counter = 0;
		let current = this.head;

		while (counter < index) {
			if (current.nextNode === null) {
				return null;
			}
			current = current.nextNode;
			counter += 1;
		}
		return current;
	}

	pop() {
		if (this.tail === null) {
			return null;
		}

		const temp = this.tail;
		this.tail = this.at(this.size - 2);
		this.tail.nextNode = null;
		this.size -= 1;
		return temp;
	}

	contains(value) {
		let counter = 0;
		let current = this.head;

		while (counter < this.size) {
			if (current.value === value) {
				return true;
			}
			current = current.nextNode;
			counter += 1;
		}
		return false;
	}

	find(value) {
		let counter = 0;
		let current = this.head;

		while (counter < this.size) {
			if (current.value === value) {
				return counter;
			}
			current = current.nextNode;
			counter += 1;
		}
		return null;
	}

	toString() {
		let counter = 0;
		let current = this.head;
		let string = '';

		while (counter < this.size) {
			string += `( ${current.value} ) -> `;
			current = current.nextNode;
			counter += 1;
		}
		string += null;
		return string;
	}

	insertAt(value, index) {
		let counter = 0;
		let current = this.head;
		const newNode = new Node(value);

		if (index < 0) {
			return 'out of index, choose higher value';
		}

		if (index === 0) {
			newNode.nextNode = this.head;
			this.head = newNode;
			return `${value} at ${index}`;
		}

		if (index > this.size - 1) {
			this.append(value);
			return 'out of index, item appended to tail';
		}

		while (current) {
			if (counter === index - 1) {
				newNode.nextNode = current.nextNode;
				current.nextNode = newNode;
				return `${value} at ${index}`;
			}
			current = current.nextNode;
			counter += 1;
		}
		return 'Index not found';
	}

	removeAt(index) {
		let counter = 0;
		let current = this.head;
		let previous = null;

		if (index < 0) {
			return 'out of index, choose higher value';
		}

		if (index > this.size - 1) {
			return 'out of index, choose lower value';
		}

		while (current) {
			if (counter === index) {
				if (previous === null) {
					this.head = current.nextNode;
				} else {
					previous.nextNode = current.nextNode;
				}
				this.size -= 1;
				return `removed index ${index} `;
			}
			previous = current;
			current = current.nextNode;
			counter += 1;
		}
		return 'Index not found';
	}
}

const fullList = new LinkedList();

fullList.append('first');
fullList.append('second');
fullList.append('third');
fullList.append('4th');
fullList.append('5th');
fullList.append('6th');
fullList.prepend('zero');

console.log(fullList.getSize());
console.log(fullList.getHead());
console.log(fullList.getTail());
console.log(fullList.at(2));
console.log(fullList.pop());
console.log(fullList.contains('zero'));
console.log(fullList.find('second'));
console.log(fullList.insertAt('new', 3));
console.log(fullList.removeAt(2));
console.log(fullList.toString());
console.log(fullList);
