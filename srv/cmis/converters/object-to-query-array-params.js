/**
 * Converts an array of input objects into a query array format.
 *
 * This function takes an array of input objects and converts each object's key-value pairs
 * into the query array format often used in URL query parameters. If a value is an array,
 * it further breaks down each array item with its index.
 *
 * Example:
 *
 * Input:
 * [{ "username": "John", "permissions": ["read", "write"] }]
 *
 * Output:
 * {
 *   "username[0]": "John",
 *   "permissions[0][0]": "read",
 *   "permissions[0][1]": "write"
 * }
 *
 * @param input - The array of input objects to be transformed.
 * @returns The transformed object in query array format.
 */
module.exports = function convertObjectToQueryArrayParams(input) {
  const result = {};

  input.forEach((item, index) => {
    Object.keys(item).forEach(key => {
      const value = item[key];

      if (Array.isArray(value)) {
        value.forEach((subItem, subIndex) => {
          result[`${key}[${index}][${subIndex}]`] = subItem;
        });
      } else {
        result[`${key}[${index}]`] = value;
      }
    });
  });

  return result;
};
