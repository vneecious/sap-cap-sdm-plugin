const cds = require('@sap/cds');
const { CmisClient } = require('sap-cloud-cmis-client');
const cmisClientManager = require('./util/CMISClientManager');
const getSettings = require('./config/settings');
const {
  onCreate,
  onRead,
  beforeAll,
  onUpdate,
  onDelete,
} = require('./handlers');

const services = [];

/**
 * Initialize plugin and define its handlers.
 */
cds.once('served', initializePlugin);

/**
 * Initializes the plugin by setting up the CMIS client and registering service handlers.
 */
async function initializePlugin() {
  const { destination, repositoryId } = getSettings();

  const cmisClient = new CmisClient({ destinationName: destination });
  await cmisClient.getRepositories(repositoryId);
  cmisClientManager.setClient(cmisClient);

  services.push(...extractServicesWithAnnotations(cds.services));

  for (let service of services) {
    registerServiceHandlers(service);
  }
}

/**
 * Extracts services with the "@Sdm.Entity" annotation.
 * @param {Object} services - All services.
 * @returns {Array} An array of services with the "@Sdm.Entity" annotation.
 */
function extractServicesWithAnnotations(services) {
  return Object.values(services)
    .map(srv => ({
      name: srv.name,
      srv,
      entities: Object.values(srv.entities).filter(
        entity => entity?.['@Sdm.Entity'],
      ),
    }))
    .filter(service => service.entities.length > 0);
}

const eventHandlersMap = {
  READ: onRead,
  CREATE: onCreate,
  UPDATE: onUpdate,
  DELETE: onDelete,
};

/**
 * Register event handlers for the given service.
 * @param {Object} service - The service to register handlers for.
 */
async function registerServiceHandlers(service) {
  const { srv, entities } = service;

  for (let entity of entities) {
    for (let [event, handler] of Object.entries(eventHandlersMap)) {
      srv.on(event, entity.name, handler);
      service = reorderHandlers(service);
    }

    srv.before('*', entity.name, beforeAll);
  }
}

/**
 * Prioritize our custom handlers.
 *
 * Move the most recently defined handler to the front.
 * This ensures our handlers are invoked before any generic handlers.
 * This step is crucial because plugins load after generic handlers.
 * Failing to prioritize might lead CAP to throw errors due to the absence of a DB definition for our service.
 *
 * @param {Object} service - The service to reorder handlers for.
 * @returns {Object} The service with reordered handlers.
 */
function reorderHandlers(service) {
  const onHandlers = service.srv._handlers.on;
  service.srv._handlers.on = [
    onHandlers[onHandlers.length - 1],
    ...onHandlers.slice(0, -1),
  ];
  return service;
}
