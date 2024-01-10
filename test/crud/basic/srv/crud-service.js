const cds = require('@sap/cds');

module.exports = class CrudService extends cds.ApplicationService {
  async init() {
    this.on('createFile', async function (req) {
      const { Files } = this.entities;
      return await this.post(Files).entries(req.data.file);
    });
    super.init();
  }
};
