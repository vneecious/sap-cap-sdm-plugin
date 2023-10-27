const cds = require('@sap/cds');
const { loadDestination } = require('../../lib/util');

// constants used in some tests
const CONFIG_NAME = 'MyTestConfig';

// before running these tests you should do a bind-local to your xsuaa and destination services
// eg.: `cf bind-local -path .env -service-names your-xsuaa your-destination-service`
cds.env.requires['sap-cap-sdm-plugin'] = {
  impl: 'sap-cap-sdm-plugin',
  settings: {
    destination: 'my-sdm-dest',
  },
};

describe('Admin Test', () => {
  let destination;
  let repository;
  let config;
  let srv;

  beforeEach(async () => {
    destination = await loadDestination();
    srv = await cds.connect.to('sdm-admin', {
      impl: '../../../srv/sdm/admin',
    });
  });

  test('onboard a repository', async () => {
    const response = await srv
      .onboardARepository({
        repository: {
          displayName: 'sdm-plugin',
          description: 'sdm-plugin',
          repositoryType: 'internal',
          isVersionEnabled: 'false',
        },
      })
      .execute(destination);
    repository = response;
    expect(repository).toBeTruthy();
  });

  test('list repositories', async () => {
    const response = await srv.listRepositories().execute(destination);
    expect(response).toHaveProperty('repoAndConnectionInfos');
  });

  test('count repositories', async () => {
    const response = await srv.countRepositories().execute(destination);
    expect(response).toHaveProperty('count');
  });

  test('get API Call Metrics', async () => {
    const response = await srv.getAPICallMetrics().execute(destination);
    expect(response).toBeTruthy();
  });

  test('get storage metrics', async () => {
    const response = await srv
      .getStorageMetrics('MB', '10', '2023')
      .execute(destination);
    expect(response).toBeTruthy();
  });

  // todo: check why it is returning HTTP 500
  test.skip('sync repositories', async () => {
    const response = await srv.syncRepositories().execute(destination);
    expect(response).toBeTruthy();
  });

  test('create Config', async () => {
    const response = await srv
      .createConfig({
        configName: CONFIG_NAME,
        configValue: 'value',
      })
      .execute(destination);
    config = response;
    expect(config.configName).toBe(CONFIG_NAME);
  });

  test('get Configs', async () => {
    const response = await srv.getConfigs().execute(destination);
    const c = response?.find(({ configName }) => configName === CONFIG_NAME);
    expect(c).toBeTruthy();
    config = c;
  });

  describe('Repository Specific', () => {
    beforeEach(() => expect(repository).toBeTruthy());

    test('fetch a repository', async () => {
      const response = await srv
        .fetchARepository(repository.id)
        .execute(destination);
      const { repository: r } = response;
      expect(r.id).toBe(repository.id);
    });

    test('update a repository', async () => {
      const NEW_DESCRIPTION = 'updated description';

      const response = await srv
        .updateARepository(repository.id, {
          repository: { description: NEW_DESCRIPTION },
        })
        .execute(destination);
      repository = response;
      expect(repository.description).toBe(NEW_DESCRIPTION);
    });

    test('sync a repository', async () => {
      const response = await srv
        .syncARepository(repository.id)
        .execute(destination);
      expect(response.message).toBe('Sync successful');
    });

    // if repository is empty, there's no much to do here, that's why i'm skipping.
    test.skip('repository offboard', async () => {
      const response = await srv
        .repositoryOffBoard(repository.id)
        .execute(destination);
      expect(response).toBeTruthy();
    });

    // same as above
    test.skip('repositoryOffBoardStatus', async () => {
      const response = await srv
        .repositoryOffBoardStatus(repository.id)
        .execute(destination);
      expect(response).toBeTruthy();
    });

    test('delete a repository', async () => {
      const response = await srv
        .deleteARepository(repository.id)
        .execute(destination);
      expect(response).toBeTruthy();
    });
  });

  describe('Config Specific', () => {
    beforeEach(() => expect(config).toBeTruthy());

    test('update a config', async () => {
      const response = await srv
        .updateConfig(config.id, {
          id: config.id,
          configName: config.configName,
          configValue: 'updated value',
          serviceInstanceId: config.serviceInstanceId,
        })
        .execute(destination);
      config = response;
      expect(response).toBeTruthy();
    });

    test('delete a config', async () => {
      const response = await srv.deleteConfig(config.id).execute(destination);
      expect(response).toBeTruthy();
    });
  });

  // be careful to running this. it will delete all repositories in your sdm instance
  test('delete all repositories', async () => {
    const response = await srv.deleteRepositories().execute(destination);
    expect(response).toBeTruthy();
  });
});
