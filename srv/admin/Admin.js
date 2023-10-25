const {
  OnboardARepositoryApi,
  DeleteARepositoryApi,
  ListRepositoriesApi,
  DeleteRepositoriesApi,
  UpdateARepositoryApi,
  SyncRepositoriesApi,
  SyncARepositoryApi,
  CountRepositoriesApi,
  GetAPICallMetricsApi,
  GetStorageMetricsApi,
  RepositoryOffBoardApi,
  RepositoryOffBoardStatusApi,
  DownloadOffBoardedRepositoryApi,
  CreateConfigApi,
  GetConfigsApi,
  UpdateConfigApi,
  DeleteConfigApi,
  FetchARepositoryApi,
} = require('./generated');
const { loadDestination } = require('../../lib/util');

module.exports = async function () {
  this.on('listRepositories', async req => {
    const destination = await loadDestination(req);

    const result =
      await ListRepositoriesApi.getRestV2Repositories().execute(destination);
    return result;
  });

  this.on('onboardARepository', async req => {
    const destination = await loadDestination(req);
    return await OnboardARepositoryApi.createRestV2Repositories(
      req.data,
    ).execute(destination);
  });

  this.on('deleteRepositories', async req => {
    const destination = await loadDestination(req);
    return await DeleteRepositoriesApi.deleteRestV2Repositories().execute(
      destination,
    );
  });

  this.on('updateARepository', async req => {
    const destination = await loadDestination(req);
    const { id, body } = req.data;

    return await UpdateARepositoryApi.updateRestV2RepositoriesById(
      id,
      body,
    ).execute(destination);
  });

  this.on('fetchARepository', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;

    return await FetchARepositoryApi.getRestV2RepositoriesById(id).execute(
      destination,
    );
  });

  this.on('deleteARepository', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await DeleteARepositoryApi.deleteRestV2RepositoriesById(id).execute(
      destination,
    );
  });

  this.on('syncRepositories', async req => {
    const destination = await loadDestination(req);
    return await SyncRepositoriesApi.getRestV2RepositoriesSync().execute(
      destination,
    );
  });

  this.on('syncARepository', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await SyncARepositoryApi.getRestV2RepositoriesSyncById(id).execute(
      destination,
    );
  });

  this.on('countRepositories', async req => {
    const destination = await loadDestination(req);
    return await CountRepositoriesApi.getRestV2RepositoriesCount().execute(
      destination,
    );
  });

  this.on('getAPICallMetrics', async req => {
    const destination = await loadDestination(req);
    return await GetAPICallMetricsApi.getRestV2UsageApi().execute(destination);
  });

  this.on('getStorageMetrics', async req => {
    const destination = await loadDestination(req);
    const { unit, fromMonth, fromYear } = req.data;
    return await GetStorageMetricsApi.getRestV2UsageStorage(
      unit,
      fromMonth,
      fromYear,
    ).execute(destination);
  });

  this.on('repositoryOffBoard', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await RepositoryOffBoardApi.createRestV2RepositoryOffBoardIdCmisactionRepositoryOffBoard(
      id,
    ).execute(destination);
  });

  this.on('repositoryOffBoardStatus', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await RepositoryOffBoardStatusApi.getRestV2RepositoryOffBoardIdCmisselectorRepositoryStatus(
      id,
    ).execute(destination);
  });

  this.on('downloadOffBoardedRepository', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await DownloadOffBoardedRepositoryApi.getRestV2RepositoryOffBoardIdCmisactionGetRepositoryDocument(
      id,
    ).execute(destination);
  });

  this.on('createConfig', async req => {
    const destination = await loadDestination(req);
    const { body } = req.data;
    return await CreateConfigApi.createRestV2Configs(body).execute(destination);
  });

  this.on('getConfigs', async req => {
    const destination = await loadDestination(req);
    return await GetConfigsApi.getRestV2Configs().execute(destination);
  });

  this.on('updateConfig', async req => {
    const destination = await loadDestination(req);
    const { id, body } = req.data;
    return await UpdateConfigApi.updateRestV2ConfigsById(id, body).execute(
      destination,
    );
  });

  this.on('deleteConfig', async req => {
    const destination = await loadDestination(req);
    const { id } = req.data;
    return await DeleteConfigApi.deleteRestV2ConfigsById(id).execute(
      destination,
    );
  });
};
