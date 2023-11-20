/* eslint-disable max-classes-per-file */

// const arrayOfData = [1, 2, 3, 4, 5, 6, 7, 8];
const arrayOfData = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
