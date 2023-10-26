const cds = require('@sap/cds');
const { loadDestination } = require('../../lib/util');
const { getRepositoryData } = require('../../lib/settings');
const CmisClient = require('../../srv/cmis/client');

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
        isVersionEnabled: 'true',
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

  let pwcDocument;
  test('check out the document', async () => {
    const srv = await cds.connect.to('cmis-client');
    pwcDocument = await srv
      .checkOut(repository.id, document.succinctProperties['cmis:objectId'])
      .execute(destination);

    expect(pwcDocument.succinctProperties['cmis:isPrivateWorkingCopy']).toBe(
      true,
    );
  });

  test('change document', async () => {
    const NEW_DOCUMENT_NAME = 'new name';
    /**
     * @type {CmisClient}
     */
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .updateProperties(
        repository.id,
        pwcDocument.succinctProperties['cmis:objectId'],
        {
          cmisProperties: {
            'cmis:name': NEW_DOCUMENT_NAME,
          },
        },
      )
      .execute(destination);
    expect(result.succinctProperties['cmis:name']).toBe(NEW_DOCUMENT_NAME);
  });

  test('check in document', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .checkIn(repository.id, pwcDocument.succinctProperties['cmis:objectId'])
      .execute(destination);

    expect(result.succinctProperties['cmis:versionLabel']).toBe('2.0');
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
