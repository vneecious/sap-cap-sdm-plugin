const { getDestination } = require('@sap-cloud-sdk/core');
const { getSettings } = require('../settings');

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

/**
 * Derives a folder name based on navigation segments in the OData request.
 *
 * If the request is a result of entity navigation, it constructs a folder name using the navigating entity's name
 * and key values. If not navigating from another entity, it returns null.
 *
 * @param {Object} req - The OData request object.
 * @returns {string|null} The derived folder name or null if not navigated from another entity.
 */
const deriveFolderNameFromNavigation = req => {
  const pathSegments = req._.odataReq.getUriInfo().getPathSegments();
  const lastNavigationSegment = [...pathSegments]
    .reverse()
    .find(segment => segment.getKind().includes('NAVIGATION'));

  if (!lastNavigationSegment) {
    return null;
  }
  const navigatingFromEntity =
    pathSegments[pathSegments.indexOf(lastNavigationSegment) - 1];
  const entityName = navigatingFromEntity.getEntitySet().getName();
  const keys = navigatingFromEntity.getKeyPredicates().map(p => p._value);
  return `${entityName}:${keys.join('-')}`;
};

const loadDestination = async req => {
  const { destination: destinationName } = getSettings();

  let options = { useCache: false };
  const userJwt =
    typeof req?._req?.tokenInfo?.getTokenValue === 'function'
      ? req?._req?.tokenInfo?.getTokenValue()
      : undefined;

  if (userJwt) {
    options = { ...options, userJwt };
  }
  return await getDestination(destinationName, options);
};

module.exports = {
  extractPluginPropertiesFromElement,
  getColumnsMapping,
  generateUrlFromField,
  deriveFolderNameFromNavigation,
  loadDestination,
};
