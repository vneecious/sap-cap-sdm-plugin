const DEFAULT_SECONDARY_TYPE = {
  baseId: 'cmis:secondary',
  parentId: 'cmis:secondary',
  creatable: false,
  fileable: false,
  queryable: true,
  fulltextIndexed: false,
  includedInSupertypeQuery: true,
  controllablePolicy: false,
  controllableACL: false,
  typeMutability: {
    create: true,
    update: true,
    delete: true,
  },
};

const DEFAULT_CMIS_PROPERTY_DEFINITION = {
  inherited: false,
  openChoice: true,
  required: false,
  queryable: true,
  orderable: false,
};

module.exports = { DEFAULT_CMIS_PROPERTY_DEFINITION, DEFAULT_SECONDARY_TYPE };
