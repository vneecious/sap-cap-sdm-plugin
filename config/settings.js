const cds = require('@sap/cds');

let cachedSettings;

const getSettings = () => {
  if (!cachedSettings) {
    cachedSettings = cds.env.requires?.['sap-cap-sdm-plugin']?.settings || {};
  }
  return cachedSettings;
};

module.exports = getSettings;
