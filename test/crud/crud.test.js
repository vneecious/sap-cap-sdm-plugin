const cds = require('@sap/cds');
const getSettings = require('sap-cap-sdm-plugin/lib/settings');
const { POST, GET } = cds.test().in(__dirname);

// before running these tests you should do a bind-local to your xsuaa and destination services
// eg.: `cf bind-local -path .env -service-names your-xsuaa your-destination-service`
cds.env.requires['sap-cap-sdm-plugin'] = {
  impl: 'sap-cap-sdm-plugin',
  settings: {
    destination: 'my-sdm-dest',
  },
};

describe('Sample API test', () => {
  beforeAll(async () => {
    const { data: repository } = await POST(
      '/sdm-plugin/admin/onboardARepository',
      {
        repository: {
          displayName: 'sdm-plugin',
          description: 'sdm-plugin',
          repositoryType: 'internal',
          isVersionEnabled: 'false',
        },
      },
    );

    cds.env.requires['sap-cap-sdm-plugin'].settings.repositoryId =
      repository.id;
  });

  afterAll(async () => {
    const { repositoryId } = getSettings();
    await POST('/sdm-plugin/admin/deleteARepository', {
      id: repositoryId,
    });
  });

  test('connected to test api', async () => {
    const response = await GET('/crud-1');
    expect(response.data?.['@odata.context']).toEqual('$metadata');
  });

  test('get empty list of files', async () => {
    const { data } = await GET('/crud-1/Files');
    expect(data.value).toBeTruthy();
    expect(data.value.length).toBe(0);
  });

  test('create an file in the root folder', async () => {
    const postResponse = await POST('/crud-1/Files', {
      name: 'teste.csv',
    });

    debugger;
  });
});
