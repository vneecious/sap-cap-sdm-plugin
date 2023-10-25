import {
  DEFAULT_CMIS_PROPERTY_DEFINITION,
  DEFAULT_SECONDARY_TYPE,
} from './constants';
export type OptionsConfig = {
  raw?: boolean;
  customHeaders?: Record<string, string>;
  customRequestConfiguration?: Record<string, string>;
  middleware?: HttpMiddleware | HttpMiddleware[];
};
export type BaseCmisOptions = {
  _charset?: string;
  succinct?: boolean;
  includeAllowableActions?: boolean;
} & BaseOptions;
export type BaseOptions = {
  config?: OptionsConfig;
};
export type WriteOptions = {
  cmisProperties?: Record<any, string | string[]>;
} & BaseCmisOptions;
export type AddAcl = {
  addACEPrincipal: string;
  addACEPermission: Array<string>;
};
export type RemoveAcl = {
  removeACEPrincipal: string;
  removeACEPermission: Array<string>;
};
export type CMISTypePropertyDefinition = {
  id: string;
  localNamespace: string;
  localName: string;
  queryName: string;
  displayName: string;
  description: string;
  propertyType:
    | 'string'
    | 'boolean'
    | 'decimal'
    | 'integer'
    | 'datetime'
    | 'uri';
  updatability: 'readwrite' | 'readonly' | 'whencheckedout' | 'oncreate';
  inherited: false;
  openChoice: true;
  required: false;
  cardinality: 'single' | 'multi';
  queryable: true;
  orderable: false;
};
export type CMISTypePropertyDefinitions = {
  [key: string]: CMISTypePropertyDefinition;
};
export type CMISType = {
  id: string;
  localNamespace: string;
  localName: string;
  queryName: string;
  displayName: string;
  description: string;
  baseId: 'cmis:secondary';
  parentId: 'cmis:secondary';
  creatable: false;
  fileable: false;
  queryable: true;
  fulltextIndexed: false;
  includedInSupertypeQuery: true;
  controllablePolicy: false;
  controllableACL: false;
  typeMutability: {
    create: true;
    update: true;
    delete: true;
  };
  propertyDefinitions?: CMISTypePropertyDefinitions;
};
export type CMISTypePropertyDefinitionInput = Omit<
  CMISTypePropertyDefinition,
  keyof typeof DEFAULT_CMIS_PROPERTY_DEFINITION
>;
export type CMISTypePropertyDefinitionsInput = {
  [key: string]: CMISTypePropertyDefinitionInput;
};
export type CMISTypeInput = Omit<
  CMISType,
  keyof typeof DEFAULT_SECONDARY_TYPE
> & {
  propertyDefinitions?: CMISTypePropertyDefinitionsInput;
};
export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
