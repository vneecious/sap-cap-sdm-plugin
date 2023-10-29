const convertCMISDocumentToOData = require('./cmis-document-to-odata-entity');
const convertODataToCMISDocument = require('./odata-entity-to-cmis-document');
const {
  convertODataQueryToCMIS,
  queryClauseBuilder,
} = require('./odata-query-to-cmis');

module.exports = {
  convertODataQueryToCMIS,
  queryClauseBuilder,
  convertCMISDocumentToOData,
  convertODataToCMISDocument,
};
