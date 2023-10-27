const cds = require('@sap/cds');
const { getRepositoryData } = require('../../../lib/settings');
const { POST, PUT, GET, DELETE } = cds.test().in(__dirname);

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
          isVersionEnabled: 'true',
        },
      },
    );

    cds.env.requires['sap-cap-sdm-plugin'].settings.repositoryId =
      repository.id;

    await getRepositoryData(true);
  });

  afterAll(async () => {
    const { repositoryId } = getSettings();
    await POST('/sdm-plugin/admin/deleteARepository', {
      id: repositoryId,
    });
  });

  test('connected to test api', async () => {
    const response = await GET('/crud-2');
    expect(response.data?.['@odata.context']).toEqual('$metadata');
  });

  test('warmup', async () => {
    const response = await GET(`/crud-2/Files`);
    expect(response.status).toBe(200);
  });

  let file;
  test('create an file in the root folder', async () => {
    const postResponse = await POST('/crud-2/Files', {
      name: `${Date.now()}-teste.txt`,
    });
    expect(postResponse.status).toBe(201);
    file = postResponse.data;

    const putResponse = await PUT(
      `/crud-2/Files('${file.id}')/content`,
      'lorem ipsum dolor',
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      },
    );
    expect(putResponse.status).toBe(204);
  });

  test('get object', async () => {
    const response = await GET(`/crud-2/Files('${file.id}')`);
    expect(response.status).toBe(200);
    const { data: retrievedDocument } = response;
    expect(retrievedDocument.id).toEqual(file.id);
  });

  test('download object content', async () => {
    const response = await GET(`/crud-2/Files('${file.id}')/content`);
    expect(response.status).toBe(200);
  });

  test('delete object', async () => {
    const response = await DELETE(`/crud-2/Files('${file.id}')`);
    expect(response.status).toBe(204);
  });
});
