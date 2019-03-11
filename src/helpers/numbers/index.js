const radixNumber = 10;

/**
* @param {array} integerList: Array containing all integers to be summed
* @returns {number} Integer value containing the sum of the integers in the list
*/
const sumIntegerList = integerList => integerList
  .reduce((currentInteger, nextInteger) => {
    const currentIntegerParsed = parseInt(currentInteger, radixNumber);
    const nextIntegerParsed = parseInt(nextInteger, radixNumber);

    return currentIntegerParsed + nextIntegerParsed;
  });

/**
* @param {number} currentInteger: Integer to be compared as the biggest number
* @param {number} targetInteger: Integer to be compared as the smallest number
* @returns {boolean} Boolean containing the result of the comparison between the two integers
*/
const isIntegerBiggerThan = (currentInteger, targetInteger) => {
  const currentIntegerParsed = parseFloat(currentInteger, radixNumber);
  const targetIntegerParsed = parseFloat(targetInteger, radixNumber);

  return currentIntegerParsed > targetIntegerParsed;
};

export default {
  isIntegerBiggerThan,
  sumIntegerList,
};
