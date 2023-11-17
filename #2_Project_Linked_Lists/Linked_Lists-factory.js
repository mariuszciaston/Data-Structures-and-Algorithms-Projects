const Node = (value = null, nextNode = null) => ({
	value,
	nextNode,
});

const LinkedList = () => {
	let head = null;
	let tail = null;
	let size = 0;

	const append = (value) => {
		const newNode = Node(value);
		size += 1;

		if (!head) {
			head = newNode;
			tail = newNode;
		} else {
			tail.nextNode = newNode;
			tail = newNode;
		}
	};

	const prepend = (value) => {
		const newNode = Node(value);
		size += 1;

		if (!head) {
			head = newNode;
			tail = newNode;
		} else {
			const temp = head;
			head = newNode;
			head.nextNode = temp;
		}
	};

	const getSize = () => size;

	const getHead = () => head;

	const getTail = () => tail;

	const at = (index) => {
		if (head === null) {
			return null;
		}

		let counter = 0;
		let current = head;

		while (counter < index) {
			if (current.nextNode === null) {
				return null;
			}
			current = current.nextNode;
			counter += 1;
		}
		return current;
	};

	const pop = () => {
		if (tail === null) {
			return null;
		}

		const temp = tail;
		tail = at(size - 2);
		tail.nextNode = null;
		size -= 1;
		return temp;
	};

	const contains = (value) => {
		let counter = 0;
		let current = head;

		while (counter < size) {
			if (current.value === value) {
				return true;
			}
			current = current.nextNode;
			counter += 1;
		}
		return false;
	};

	const find = (value) => {
		let counter = 0;
		let current = head;

		while (counter < size) {
			if (current.value === value) {
				return counter;
			}
			current = current.nextNode;
			counter += 1;
		}
		return null;
	};

	const toString = () => {
		let counter = 0;
		let current = head;
		let string = '';

		while (counter < size) {
			string += `( ${current.value} ) -> `;
			current = current.nextNode;
			counter += 1;
		}
		string += null;
		return string;
	};

	const insertAt = (value, index) => {
		let counter = 0;
		let current = head;
		const newNode = Node(value);

		if (index < 0) {
			return 'out of index, choose higher value';
		}

		if (index === 0) {
			newNode.nextNode = head;
			head = newNode;
			return `${value} at ${index}`;
		}

		if (index > size - 1) {
			append(value);
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
	};

	const removeAt = (index) => {
		let counter = 0;
		let current = head;
		let previous = null;

		if (index < 0) {
			return 'out of index, choose higher value';
		}

		if (index > size - 1) {
			return 'out of index, choose lower value';
		}

		while (current) {
			if (counter === index) {
				if (previous === null) {
					head = current.nextNode;
				} else {
					previous.nextNode = current.nextNode;
				}
				size -= 1;
				return `removed index ${index} `;
			}
			previous = current;
			current = current.nextNode;
			counter += 1;
		}
		return 'Index not found';
	};

	return {
		append,
		prepend,
		getSize,
		getHead,
		getTail,
		at,
		pop,
		contains,
		find,
		toString,
		insertAt,
		removeAt,
	};
};

const fullList = LinkedList();

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
