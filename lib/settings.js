const cds = require('@sap/cds');

let cachedSettings;

const getSettings = (noCache = false) => {
  if (!cachedSettings || noCache) {
    cachedSettings = cds.env.requires?.['sap-cap-sdm-plugin']?.settings || {};

    // TODO: Consider retrieving repository-specific parameters here
    // to handle specific behaviors, such as thumbnail generation and
    // version management (checkin / checkout).
  }
  return cachedSettings;
};

module.exports = getSettings;
