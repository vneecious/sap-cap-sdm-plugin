const cds = require('@sap/cds');

let repositoryData;

const getSettings = () => {
  return cds.env.requires?.['sap-cap-sdm-plugin']?.settings || {};
};

const getRepositoryData = async (ignoreCache = false) => {
  if (repositoryData && !ignoreCache) {
    return repositoryData;
  }

  const admin = await cds.connect.to('SdmAdmin');
  const { repoAndConnectionInfos } = await admin.listRepositories();

  let { repositoryId } = getSettings();
  if (!repositoryId) {
    const defaultRepositoryId = Array.isArray(repoAndConnectionInfos)
      ? repoAndConnectionInfos[0].repository.id
      : repoAndConnectionInfos.repository.id;
    cds.env.requires['sap-cap-sdm-plugin'].settings.repositoryId =
      defaultRepositoryId;
    repositoryId = defaultRepositoryId;
  }

  const { repository } = Array.isArray(repoAndConnectionInfos)
    ? repoAndConnectionInfos.find(r => r.repository.id == repositoryId)
    : repoAndConnectionInfos;

  const { repositoryParams, ...repoData } = repository;
  const params = repositoryParams.reduce((acc, item) => {
    acc[item.paramName] = item.paramValue;
    return acc;
  }, {});

  repositoryData = {
    ...repoData,
    params,
  };

  return repositoryData;
};

module.exports = { getSettings, getRepositoryData };
