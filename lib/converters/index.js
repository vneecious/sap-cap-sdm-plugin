const convertCMISDocumentToOData = require('./cmis-document-to-odata-entity');
const {
  convertODataQueryToCMIS,
  queryClauseBuilder,
} = require('./odata-query-to-cmis');

module.exports = {
  convertODataQueryToCMIS,
  queryClauseBuilder,
  convertCMISDocumentToOData,
};
