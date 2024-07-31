class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		this.capacity = capacity;
		this.buckets = new Array(this.capacity).fill(null);
		this.threshold = capacity * loadFactor;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i += 1) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
		}

		return hashCode;
	}

	set(key, value) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}
		this.buckets[index] = { key, value };
	}

	get(key) {
		const index = this.hash(key);
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}
		return this.buckets[index]?.value || null;
	}
}

const test = new HashMap();

test.set('apple', 'red');
//  test.set('banana', 'yellow')
//  test.set('carrot', 'orange')
//  test.set('dog', 'brown')
//  test.set('elephant', 'gray')
//  test.set('frog', 'green')
//  test.set('grape', 'purple')
//  test.set('hat', 'black')
//  test.set('ice cream', 'white')
//  test.set('jacket', 'blue')
//  test.set('kite', 'pink')
//  test.set('lion', 'golden')

console.log(test);

console.log(test.get('apple'));
