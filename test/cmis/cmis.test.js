const cds = require('@sap/cds');
const getSettings = require('../../lib/settings');
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
    const { repositoryId } = getSettings(true);
    await POST('/sdm-plugin/admin/deleteARepository', {
      id: repositoryId,
    });
  });

  test('fetch repositories', async () => {
    const response = await GET('/sdm-plugin/fetch-repository/browser()');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data?.value)).toBeTruthy();
  });

  // create document

  // create folder

  // query
});
