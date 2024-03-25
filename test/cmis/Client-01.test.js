const cds = require('@sap/cds');
const { loadDestination } = require('../../lib/util');

cds.env.requires['sap-cap-sdm-plugin'] = {
  impl: 'sap-cap-sdm-plugin',
  settings: {
    destination: 'my-sdm-dest',
  },
};

describe('CMIS Client', () => {
  let repository, destination;

  beforeAll(async () => {
    const srv = await cds.connect.to('sdm-admin', {
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
    const srv = await cds.connect.to('sdm-admin');
    await srv.deleteARepository(repository.id).execute(destination);
  });

  beforeEach(async () => {
    destination = await loadDestination();
  });

  test('fetch repository', async () => {
    const srv = await cds.connect.to('cmis-client', {
      impl: '../../../srv/cmis/client',
    });

    const result = await srv.fetchRepository().execute(destination);
    expect(result).toHaveProperty(repository.id);
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

  test('set content stream', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .setContentStream(
        repository.id,
        document.succinctProperties['cmis:objectId'],
        document.succinctProperties['cmis:name'],
        'updated content by setContentStream',
      )
      .execute(destination);

    expect(result.succinctProperties['cmis:contentStreamLength']).not.toBe(
      document.succinctProperties['cmis:contentStreamLength'],
    );
  });

  test('add acl properties', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .addACLProperty(
        repository.id,
        document.succinctProperties['cmis:objectId'],
        [
          {
            addACEPrincipal: 'foo',
            addACEPermission: ['cmis:read'],
          },
        ],
      )
      .execute(destination);

    expect(result).toHaveProperty('aces');
    const addedACE = result.aces.find(
      ace => ace.principal.principalId === 'foo',
    );
    expect(addedACE).toBeTruthy();
  });

  test('get acl properties', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .getACLProperty(
        repository.id,
        document.succinctProperties['cmis:objectId'],
      )
      .execute(destination);

    expect(result).toHaveProperty('acl');
    expect(result.acl.aces.length).toBe(2);
  });

  test('remove acl properties', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .removeACLProperty(
        repository.id,
        document.succinctProperties['cmis:objectId'],
        [
          {
            removeACEPrincipal: 'foo',
            removeACEPermission: ['cmis:read'],
          },
        ],
      )
      .execute(destination);

    expect(result).toHaveProperty('aces');
    const deletedACE = result.aces.find(
      ace => ace.principal.principalId === 'foo',
    );
    expect(deletedACE).toBeFalsy();
  });

  test('CMIS Query', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .cmisQuery(repository.id, 'select * from cmis:document')
      .execute(destination);

    expect(result).toHaveProperty('numItems');
  });

  test('CMIS query with filter', async () => {
    const srv = await cds.connect.to('cmis-client');
    const result = await srv
      .cmisQuery(
        repository.id,
        `select * from cmis:document where cmis:name = '${document.succinctProperties['cmis:name']}'`,
        {
          maxItems: 1,
        },
      )
      .execute(destination);

    expect(result).toHaveProperty('numItems');
    expect(result.numItems).toBe(1);
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

  test('create a document inside a folder', async () => {
    const srv = await cds.connect.to('cmis-client');
    const folder = await srv
      .createFolder(repository.id, `${Date.now()}-testFolder`)
      .execute(destination);

    const result = await srv
      .createDocument(
        repository.id,
        `${Date.now()}-test.txt`,
        'lorem ipsum dolor',
        {
          folderPath: folder.succinctProperties['cmis:name'],
        },
      )
      .execute(destination);

    expect(result).toHaveProperty('succinctProperties');
    expect(
      result.succinctProperties['sap:parentIds'].find(
        parentId => folder.succinctProperties['cmis:objectId'] === parentId,
      ),
    ).toBeTruthy();
  });

  test('create document inside a subfolder of a folder', async () => {
    const srv = await cds.connect.to('cmis-client');
    const folder = await srv
      .createFolder(repository.id, `${Date.now()}-testFolder`)
      .execute(destination);
    const subfolder = await srv
      .createFolder(repository.id, `${Date.now()}-testSubFolder`, {
        folderPath: folder.succinctProperties['cmis:name'],
      })
      .execute(destination);

    const result = await srv
      .createDocument(
        repository.id,
        `${Date.now()}-test.txt`,
        'lorem ipsum dolor',
        {
          folderPath: `${folder.succinctProperties['cmis:name']}/${subfolder.succinctProperties['cmis:name']}`,
        },
      )
      .execute(destination);

    expect(result).toHaveProperty('succinctProperties');
    expect(
      result.succinctProperties['sap:parentIds'].find(
        parentId => subfolder.succinctProperties['cmis:objectId'] === parentId,
      ),
    ).toBeTruthy();
  });
});
