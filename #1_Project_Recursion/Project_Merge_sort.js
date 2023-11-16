const unsortedArray = [5, 30, 9, 1, -2]; // [-2, 1, 5, 9, 30]

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




console.log(mergeSort(unsortedArray));
