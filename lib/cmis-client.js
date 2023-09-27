let _cmisClient;

module.exports = {
  set client(cmisClient) {
    _cmisClient = cmisClient;
  },
  get client() {
    return _cmisClient;
  },
};
