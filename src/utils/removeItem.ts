export const removeArrayItem = (array: unknown[], value: unknown) => {
  const index = array.indexOf(value);

  if (index !== -1) {
    array.splice(index, 1);
  }
}
