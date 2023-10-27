const cds = require('@sap/cds');
const { getSettings } = require('./lib/settings');
const {
  onCreate,
  onRead,
  beforeAll,
  onUpdate,
  onDelete,
} = require('./lib/handlers');
const sdmServices = [];

/**
 * Initialize plugin and define its handlers.
 */
cds.once('served', services => {
  if (cds.env.requires?.['sap-cap-sdm-plugin']) initializePlugin(services);
});

/**
 * Initializes the plugin by setting up the CMIS client and registering service handlers.
 */
async function initializePlugin(services) {
  getSettings();

  cds.env.requires['cmis-client'] = { impl: `${__dirname}/srv/cmis/client` };

  // Get all services that has any entity annotated with @Sdm.Entity
  sdmServices.push(...extractServicesWithAnnotations(services));

  // Register our handlers for each one of those
  for (let service of sdmServices) {
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
    .filter(service => service instanceof cds.ApplicationService)
    .map(service => ({
      name: service.name,
      srv: service,
      entities: Object.values(service.entities).filter(
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

  srv.prepend(() => {
    for (let entity of entities) {
      for (let [event, handler] of Object.entries(eventHandlersMap)) {
        srv.on(event, entity.name, handler);
      }

      srv.before('*', entity.name, beforeAll);
    }
  });
}
