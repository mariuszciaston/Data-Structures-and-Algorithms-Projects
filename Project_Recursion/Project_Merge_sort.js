// const unsortedArray = [5, 2, 8, 1, 7, 3, 4, 6, 1];

// const unsortedArray = [5, 2, 8, 1, 7, 3, 4, 6];

// const unsortedArray = [5, 2, 8, 1, 7, 3, 4];

const unsortedArray = [5, 4, 3, 2, 1];

// const unsortedArray = [5, 2, 1, 3, 6, 4];

// sort left half of elements
// sort right half of elements
// merge sorted halves

function mergeSort(array, sortedArray = []) {
	if (array.length < 2) {
		return array;
	}

	const middlePoint = Math.ceil(array.length / 2);
	let leftHalf = array.slice(0, middlePoint);
	let rightHalf = array.slice(middlePoint);

	console.log(`\u001b[1;35m left: ${leftHalf}`);
	console.log(`\u001b[1;34m right: ${rightHalf}`);

	mergeSort(leftHalf);









	





	// mergeSort(rightHalf);




	// if (rightHalf.length === 1) {
	// 	console.log(`RRRRRRRRRRRRRRR ${rightHalf}`);

	// 	if (leftHalf > rightHalf) {
	// 		const temp = rightHalf;
	// 		rightHalf = leftHalf;
	// 		leftHalf = temp;
	// 	}
	// }

	// if (leftHalf.length === 1) {
	// 	console.log(`LLLLLLLLLLLLLLL ${leftHalf}`);

	// 	if (leftHalf > rightHalf) {
	// 		const temp = rightHalf;
	// 		rightHalf = leftHalf;
	// 		leftHalf = temp;
	// 	}



	// 	sortedArray.push(leftHalf[0], rightHalf[0]);
	// 	console.log(sortedArray);

		// sortedArray.push(leftHalf, rightHalf);
	// }






	// const sortedArray = [];

	// sortedArray.push(leftHalf, rightHalf);

	// console.log( sortedArray);

	// 	sortedArray.push(leftHalf, rightHalf);

	// return sortedArray

	// return sortedArray;
}

console.log(`\u001b[1;31m ${mergeSort(unsortedArray)}`);
