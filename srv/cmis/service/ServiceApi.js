const getSettings = require('sap-cap-sdm-plugin/lib/settings');
const { FetchRepositoryApi } = require('./generated/fetch-repository-api');
const { loadDestination } = require('../../../lib/util');

module.exports = async function () {
  const { repositoryId } = getSettings();

  this.on('browser', async req => {
    const destination = await loadDestination(req);
    const result = await FetchRepositoryApi.getBrowser().execute(destination);
    return Object.values(result);
  });
};
