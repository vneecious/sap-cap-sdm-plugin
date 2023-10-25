const cds = require('@sap/cds');
const { loadDestination } = require('../../lib/util');
const { getRepositoryData } = require('../../lib/settings');

cds.test('serve', 'srv/admin/Admin.cds');

cds.env.requires['sap-cap-sdm-plugin'] = {
  impl: 'sap-cap-sdm-plugin',
  settings: {
    destination: 'my-sdm-dest',
  },
};

describe('CMIS Client', () => {
  let repository, destination;

  beforeAll(async () => {
    const srv = await cds.connect.to('SdmAdmin');
    repository = await srv.onboardARepository({
      repository: {
        displayName: 'sdm-plugin',
        description: 'sdm-plugin',
        repositoryType: 'internal',
        isVersionEnabled: 'false',
      },
    });

    cds.env.requires['sap-cap-sdm-plugin'].settings.repositoryId =
      repository.id;

    await getRepositoryData(true);
  });

  afterAll(async () => {
    const srv = await cds.connect.to('SdmAdmin');
    await srv.deleteARepository(repository.id);
  });

  beforeEach(async () => {
    destination = await loadDestination();
  });

  test('create a folder', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .createFolder(repository.id, `${Date.now()}-testFolder`)
      .execute(destination);
    expect(result).toHaveProperty('succinctProperties');
  });

  let document;
  test('create a document', async () => {
    const srv = await cds.connect.to('cmis-client');
    const createResult = await srv
      .createDocument(
        repository.id,
        `${Date.now()}-test.txt`,
        'lorem ipsum dolor',
      )
      .execute(destination);
    expect(createResult).toHaveProperty('succinctProperties');
    document = createResult;
  });

  test('get a object', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .getObject(repository.id, document.succinctProperties['cmis:objectId'])
      .execute(destination);
    expect(result).toHaveProperty('succinctProperties');
  });

  test('append content stream', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .appendContentStream(
        repository.id,
        document.succinctProperties['cmis:objectId'],
        document.succinctProperties['cmis:name'],
        'updated content by appendContentStream',
      )
      .execute(destination);

    expect(result.succinctProperties['cmis:contentStreamLength']).not.toBe(
      document.succinctProperties['cmis:contentStreamLength'],
    );
  });

  test('CMIS Query', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .cmisQuery(repository.id, 'select * from cmis:document')
      .execute(destination);

    expect(result).toHaveProperty('numItems');
  });

  test('download a document', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .downloadFile(repository.id, document.succinctProperties['cmis:objectId'])
      .execute(destination);

    expect(typeof result).toBe('string');
  });

  test('delete a object', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .deleteObject(repository.id, document.succinctProperties['cmis:objectId'])
      .executeRaw(destination);

    expect(result.status).toBe(200);
    expect(result.data).toBe('');
  });
});
