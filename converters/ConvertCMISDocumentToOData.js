const {
  extractPluginPropertiesFromElement,
  generateUrlFromField,
} = require('../util');
const { getClient } = require('../util/CMISClientManager');

/**
 * Converts a CMIS document structure to OData format based on the provided elements mapping.
 *
 * @param {Array<Object>} data - An array of CMIS document structures to be converted.
 * @param {Object} elements - The OData properties
 * @returns {Promise<Array<Object>>} An array of data transformed into OData format.
 */
const convertCMISDocumentToOData = (data, elements) => {
  const cmisClient = getClient();
  const cmisDocuments = Array.isArray(data) ? data : [data];

  return cmisDocuments.map(query => {
    const result = {};

    for (let [key, value] of Object.entries(elements)) {
      const sdmField = extractPluginPropertiesFromElement(value);
      if (!sdmField) continue;

      switch (sdmField?.type) {
        case 'property':
          const newValue = query.succinctProperties[sdmField?.path];
          if (newValue) result[key] = newValue;
          break;
        case 'url':
          result[key] = generateUrlFromField(
            cmisClient.defaultRepository.repositoryId,
            sdmField,
            query,
          );
          break;
      }
    }

    return result;
  });
};

module.exports = convertCMISDocumentToOData;
