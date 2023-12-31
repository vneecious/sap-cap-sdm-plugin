const cds = require('@sap/cds');
const { loadDestination } = require('../../../lib/util');
const { POST, PUT, GET, DELETE } = cds.test().in(__dirname);

let repository, destination;
describe('Sample API test', () => {
  beforeAll(async () => {
    // Named it 'test-admin' instead of 'sdm-admin' to prevent interference with the plugin's execution
    const srv = await cds.connect.to('test-admin', {
      impl: '../../../srv/sdm/admin',
    });
    destination = await loadDestination();
    repository = await srv
      .onboardARepository({
        repository: {
          displayName: 'sdm-plugin',
          description: 'sdm-plugin',
          repositoryType: 'internal',
          isVersionEnabled: 'false',
        },
      })
      .execute(destination);

    cds.env.requires['sap-cap-sdm-plugin'].settings.repositoryId =
      repository.id;
  });

  afterAll(async () => {
    const srv = await cds.connect.to('test-admin');
    await srv.deleteARepository(repository.id).execute(destination);
  });

  test('connected to test api', async () => {
    const response = await GET('/crud');
    expect(response.data?.['@odata.context']).toEqual('$metadata');
  });

  test('warmup', async () => {
    const response = await GET(`/crud/Files`);
    expect(response.status).toBe(200);
  });

  let file;
  test('create an file in the root folder', async () => {
    const postResponse = await POST('/crud/Files', {
      name: `${Date.now()}-teste.txt`,
    });
    expect(postResponse.status).toBe(201);
    file = postResponse.data;

    const putResponse = await PUT(
      `/crud/Files('${file.id}')/content`,
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
    const response = await GET(`/crud/Files('${file.id}')`);
    expect(response.status).toBe(200);
    const { data: retrievedDocument } = response;
    expect(retrievedDocument.id).toEqual(file.id);
  });

  test('get list of objects', async () => {
    const response = await GET('/crud/Files');
    expect(response.status).toBe(200);
  });

  test('count list of objects', async () => {
    const response = await GET('/crud/Files/$count');
    expect(response.status).toBe(200);
    expect(response.data).toBeGreaterThan(0);
  });

  test('inline count list of objects', async () => {
    const response = await GET('/crud/Files?$count=true');
    expect(response.status).toBe(200);
    expect(response.data?.['@odata.count']).toBeTruthy();
    expect(response.data['@odata.count']).toBeGreaterThan(0);
  });

  test('download object content', async () => {
    const response = await GET(`/crud/Files('${file.id}')/content`);
    expect(response.status).toBe(200);
  });

  test('delete object', async () => {
    const response = await DELETE(`/crud/Files('${file.id}')`);
    expect(response.status).toBe(204);
  });
});
