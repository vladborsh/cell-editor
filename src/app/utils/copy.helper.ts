export function copy<T>(arr: T[][]) {
  const newArr = [];

  for (const row of arr) {
    newArr.push([...row]);
  }
}
