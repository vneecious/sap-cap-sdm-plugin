const cds = require('@sap/cds');
const { loadDestination } = require('../../../lib/util');
const { GET } = cds.test().in(__dirname);

let repository, destination, file;
describe('Sample API test', () => {
  beforeAll(async () => {
    // Named it 'test-cmis-client' instead of 'cmis-client' to prevent interference with the plugin's execution
    await cds.connect.to('test-cmis-client', {
      impl: '../../../srv/cmis/client',
    });

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
    const response = await GET('/read');
    expect(response.data?.['@odata.context']).toEqual('$metadata');
  });

  before(async () => {
    const srv = await cds.connect.to('test-cmis-client');
    file = await srv
      .createDocument(repository.id, `${Date.now()}-test.txt`, 'lorem ipsum')
      .execute(destination);
    expect(file).toBeTruthy();
  });

  test('get all', async () => {
    const response = await GET(`/read/Files`);
    expect(response.status).toBe(200);
  });

  test('get object', async () => {
    const response = await GET(
      `/read/Files('${file.succinctProperties['cmis:objectId']}')`,
    );
    expect(response.status).toBe(200);
    const { data: retrievedDocument } = response;
    expect(retrievedDocument.id).toEqual(
      file.succinctProperties['cmis:objectId'],
    );
  });

  test('download object content', async () => {
    const response = await GET(
      `/read/Files('${file.succinctProperties['cmis:objectId']}')/url`,
    );
    expect(response.status).toBe(200);
  });
});
