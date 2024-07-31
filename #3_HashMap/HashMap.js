class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.loadFactor = loadFactor;
		this.buckets = new Array(this.capacity).fill(null);
		this.threshold = capacity * loadFactor;
	}

	resize() {
		if (this.length() >= this.threshold) {
			const newCapacity = this.capacity * 2;
			const newBuckets = new Array(newCapacity).fill(null);

			this.capacity = newCapacity;

			this.buckets.forEach((bucket) => {
				if (bucket !== null) {
					const index = this.hash(bucket.key);
					newBuckets[index] = bucket;
				}
			});

			this.buckets = newBuckets;
			this.threshold = newCapacity * this.loadFactor;
		} else if (this.length() < this.threshold) {
			const newCapacity = Math.max(16, Math.floor(this.capacity / 2));
			const newBuckets = new Array(newCapacity).fill(null);

			this.capacity = newCapacity;

			this.buckets.forEach((bucket) => {
				if (bucket !== null) {
					const index = this.hash(bucket.key);
					newBuckets[index] = bucket;
				}
			});

			this.buckets = newBuckets;
			this.threshold = newCapacity * this.loadFactor;
		}
	}

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
		this.buckets[index] = { key, value };
		this.resize();
	}

	get(key) {
		const index = this.hash(key);
		this.checkIndexBounds(index);
		return this.buckets[index]?.value || null;
	}

	has(key) {
		const index = this.hash(key);
		this.checkIndexBounds(index);
		return this.buckets[index]?.key === key;
	}

	remove(key) {
		const index = this.hash(key);
		this.checkIndexBounds(index);
		if (this.buckets[index]?.key === key) {
			this.buckets[index] = null;
			this.resize();
			return true;
		}
		return false;
	}

	length() {
		return this.buckets.filter((bucket) => bucket !== null).length;
	}

	clear() {
		this.buckets.fill(null);
		this.resize();
		return true;
	}

	keys() {
		return this.buckets.filter((bucket) => bucket !== null).map((bucket) => bucket.key);
	}

	values() {
		return this.buckets.filter((bucket) => bucket !== null).map((bucket) => bucket.value);
	}

	entries() {
		return this.buckets.filter((bucket) => bucket !== null).map((bucket) => [bucket.key, bucket.value]);
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

test.set('F', '6');

// console.log('Length:', test.length());
// console.log('Get:', test.get('apple'));
// console.log('Has:', test.has('apple'));
// console.log('Remove:', test.remove('apple'));
// console.log('Has:', test.has('apple'));
// console.log('Length:', test.length());
// console.log("Clear:", test.clear());
// console.log("Length:", test.length());
// console.log('Keys:', test.keys());
// console.log('Values:', test.values());
// console.log('Entries:', test.entries());

console.log(test.buckets);
console.log('Length:', test.length());
console.log('Threshold:', test.threshold);
console.log('Capacity:', test.capacity);
