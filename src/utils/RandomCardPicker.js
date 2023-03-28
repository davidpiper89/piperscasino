export const RandomCardPicker = (array) => {
  const random = Math.floor(Math.random() * array.length);
  const card = array[random];
  array.splice(random, 1);
  return { card, array };
};
