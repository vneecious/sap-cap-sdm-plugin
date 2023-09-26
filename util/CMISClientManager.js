let cmisClient;

module.exports = {
  setClient: client => {
    cmisClient = client;
  },
  getClient: () => {
    return cmisClient;
  },
};
