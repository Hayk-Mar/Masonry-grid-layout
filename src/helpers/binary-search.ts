export const binarySearch = <T>(
  array: T[],
  predicate: (element: T, index: number) => number
): [T | null, number] => {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = predicate(array[mid] as T, mid);

    if (comparison === 0) {
      return [array[mid], mid];
    }
    if (comparison < 1) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return [null, low];
};
