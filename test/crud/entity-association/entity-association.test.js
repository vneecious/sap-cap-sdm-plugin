const cds = require('@sap/cds');
const fs = require('fs');
const { loadDestination } = require('../../../lib/util');
const { PUT, GET } = cds.test().in(__dirname);

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
    const response = await GET('/entity-association');
    expect(response.data?.['@odata.context']).toEqual('$metadata');
  });

  test('add avatar to user', async () => {
    let response = await PUT('/entity-association/Users(1)/avatar', {
      imageType: 'image/jpeg',
    });

    expect(response.status).toBe(200);

    const filePath = `${__dirname}/avatar.svg`;
    const fileStream = fs.createReadStream(filePath);

    response = await PUT(
      '/entity-association/Users(1)/avatar/content',
      fileStream,
      {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      },
    );

    expect(response.status).toBe(204);
  });

  test('get avatar data from user', async () => {
    const response = await GET('/entity-association/Users(1)/avatar');
    expect(response.status).toBe(200);
  });

  test('download avatar from user', async () => {
    const response = await GET('/entity-association/Users(1)/avatar/content');
    expect(response.status).toBe(200);
  });
});
