const extractPluginPropertiesFromElement = element => {
  const sdmField = {};
  for (const [key, value] of Object.entries(element)) {
    if (key.startsWith('@Sdm.Field.')) {
      const propName = key.split('.').pop().replace(':', '');
      sdmField[propName] = value;
    }
  }

  return Object.keys(sdmField).length ? sdmField : null;
};

const getColumnsMapping = elements => {
  return Object.values(elements).reduce((acc, e) => {
    const sdmField = extractPluginPropertiesFromElement(e);
    if (sdmField?.type === 'property') {
      acc[e.name] = sdmField;
    }
    return acc;
  }, {});
};

/**
 * Generates a URL based on the given SDM field and query.
 * @param {Object} sdmField - The SDM field data.
 * @param {Object} query - The CMIS query data.
 * @returns {string} The generated URL.
 */
const generateUrlFromField = (repositoryId, sdmField, query) => {
  const { path: contentStreamId } = sdmField;
  const { 'cmis:objectId': objectId } = query.succinctProperties;
  let url = `/browser/${repositoryId}/root?cmisselector=content&objectId=${objectId}`;
  if (contentStreamId) {
    url += `&streamId=${contentStreamId}`;
  }
  return url;
};

module.exports = {
  extractPluginPropertiesFromElement,
  getColumnsMapping,
  generateUrlFromField,
};
