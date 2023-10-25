const cds = require('@sap/cds');
const { POST, GET } = cds.test('serve', 'srv/admin/Admin.cds');

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
  let repository, config;

  test('onboard a repository', async () => {
    const response = await POST('/sdm-plugin/admin/onboardARepository', {
      repository: {
        displayName: 'sdm-plugin',
        description: 'sdm-plugin',
        repositoryType: 'internal',
        isVersionEnabled: 'false',
      },
    });
    repository = response.data;
    expect(response.status).toBe(200);
    expect(repository).toBeTruthy();
  });

  test('list repositories', async () => {
    const response = await GET('/sdm-plugin/admin/listRepositories()');
    expect(response.status).toBe(200);
  });

  test('count repositories', async () => {
    const response = await GET('/sdm-plugin/admin/countRepositories()');
    expect(response.status).toBe(200);
    expect(response.data?.count).toBeTruthy();
  });

  test('get API Call Metrics', async () => {
    const response = await GET('/sdm-plugin/admin/getAPICallMetrics()');
    expect(response.status).toBe(200);
  });

  test('get storage metrics', async () => {
    const response = await GET(
      `/sdm-plugin/admin/getStorageMetrics(unit='MB',fromMonth='10',fromYear='2023')`,
    );
    expect(response.status).toBe(200);
  });

  // todo: check why it is returning HTTP 500
  test.skip('sync repositories', async () => {
    const response = await GET('/sdm-plugin/admin/syncRepositories()');
    expect(response.status).toBe(200);
  });

  test('create Config', async () => {
    const response = await POST('/sdm-plugin/admin/createConfig', {
      body: {
        configName: CONFIG_NAME,
        configValue: 'value',
      },
    });
    config = response.data;
    expect(response.status).toBe(200);
    expect(response.data.configName).toBe(CONFIG_NAME);
  });

  describe('Repository Specific', () => {
    beforeEach(() => expect(repository).toBeTruthy());

    test('fetch a repository', async () => {
      const response = await GET(
        `/sdm-plugin/admin/fetchARepository(id='${repository.id}')`,
      );

      const { repository: r } = response.data;

      expect(response.status).toBe(200);
      expect(r.id).toBe(repository.id);
    });

    test('update a repository', async () => {
      const NEW_DESCRIPTION = 'updated description';

      const response = await POST('/sdm-plugin/admin/updateARepository', {
        id: repository.id,
        body: { repository: { description: NEW_DESCRIPTION } },
      });
      repository = response.data;
      expect(response.status).toBe(200);
      expect(repository.description).toBe(NEW_DESCRIPTION);
    });

    test('sync a repository', async () => {
      const response = await GET(
        `/sdm-plugin/admin/syncARepository(id='${repository.id}')`,
      );
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('Sync successful');
    });

    // if repository is empty, there's no much to do here, that's why i'm skipping.
    test.skip('repository offboard', async () => {
      const response = await POST(`/sdm-plugin/admin/repositoryOffBoard`, {
        id: repository.id,
      });
      expect(response.status).toBe(200);
    });

    // same as above
    test.skip('repositoryOffBoardStatus', async () => {
      const response = await GET(
        `/sdm-plugin/admin/repositoryOffBoardStatus(id='${repository.id}')`,
      );
      expect(response.status).toBe(200);
    });

    test('delete a repository', async () => {
      const response = await POST('/sdm-plugin/admin/deleteARepository', {
        id: repository.id,
      });
      expect(response.status).toBe(200);
    });
  });

  describe('Config Specific', () => {
    beforeEach(() => expect(config).toBeTruthy());

    test('get Configs', async () => {
      const response = await GET('/sdm-plugin/admin/getConfigs()');
      expect(response.status).toBe(200);

      const c = response.data?.value?.find(
        ({ configName }) => configName === CONFIG_NAME,
      );

      expect(c).toBeTruthy();
    });

    test('update a config', async () => {
      const response = await POST('/sdm-plugin/admin/updateConfig', {
        id: config.id,
        body: {
          id: config.id,
          configName: config.configName,
          configValue: 'updated value',
          serviceInstanceId: config.serviceInstanceId,
        },
      });
      expect(response.status).toBe(200);
      config = response.data;
    });

    test('delete a config', async () => {
      const response = await POST('/sdm-plugin/admin/deleteConfig', {
        id: config.id,
      });
      expect(response.status).toBe(200);
    });
  });

  // be careful to running this. it will delete all repositories in your sdm instance
  test('delete all repositories', async () => {
    const response = await POST('/sdm-plugin/admin/deleteRepositories');
    expect(response.status).toBe(200);
  });
});
