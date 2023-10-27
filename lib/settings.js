const cds = require('@sap/cds');

const getSettings = () => {
  return cds.env.requires?.['sap-cap-sdm-plugin']?.settings || {};
};

module.exports = { getSettings };
