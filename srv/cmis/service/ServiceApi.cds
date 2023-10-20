@path                               : '/sdm-plugin/fetch-repository'
@Capabilities.BatchSupported        : false
@Capabilities.KeyAsSegmentSupported : true
@Core.Description                   : 'Fetch Repository'
@Core.LongDescription               : 'Provides detailed information of all the Content Management Interoperability Services(CMIS) repositories linked to an instance with all the necessary information for connecting to them'
service SdmFetchRepository {};

@Common.Label         : 'Fetch Repository'
@Core.Description     : 'Returns all Content Management Interoperability Services(CMIS) repositories available for the instance'
@Core.LongDescription : 'Provides detailed information of all the Content Management Interoperability Services(CMIS) repositories linked to an instance with all the necessary information for connecting to them. Response is an object with key as repoID and value will be an object with all necessary information of the repo.'
function SdmFetchRepository.browser() returns SdmFetchRepository_types.repoObject;

type SdmFetchRepository_types.repoObject : array of SdmFetchRepository_types.object;

type SdmFetchRepository_types.object {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Repo id'
  repositoryId                          :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Repo Name'
  repositoryName                        :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Description for the repository'
  repositoryDescription                 :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'SAP AG'
  vendorName                            :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'SAP Document Management Service'
  productName                           :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 1
  productVersion                        :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : '54c16370006fac14ec10fb06'
  rootFolderId                          :      String;
  capabilities                          : {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'anytime'
    capabilityContentStreamUpdatability :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'objectidsonly'
    capabilityChanges                   :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'none'
    capabilityRenditions                :      String;
    capabilityGetDescendants            :      Boolean;
    capabilityGetFolderTree             :      Boolean;
    capabilityMultifiling               :      Boolean;
    capabilityUnfiling                  :      Boolean;
    capabilityVersionSpecificFiling     :      Boolean;
    capabilityPWCSearchable             :      Boolean;
    capabilityPWCUpdatable              :      Boolean;
    capabilityAllVersionsSearchable     :      Boolean;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'custom'
    capabilityOrderBy                   :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'metadataonly'
    capabilityQuery                     :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'none'
    capabilityJoin                      :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'manage'
    capabilityACL                       :      String;
    capabilityCreatablePropertyTypes    : {
      canCreate                         : many SdmFetchRepository.anonymous.type0;
    };
    capabilityNewTypeSettableAttributes : {
      id                                :      Boolean;
      localName                         :      Boolean;
      localNamespace                    :      Boolean;
      displayName                       :      Boolean;
      queryName                         :      Boolean;
      description                       :      Boolean;
      creatable                         :      Boolean;
      fileable                          :      Boolean;
      queryable                         :      Boolean;
      fulltextIndexed                   :      Boolean;
      includedInSupertypeQuery          :      Boolean;
      controllablePolicy                :      Boolean;
      controllableACL                   :      Boolean;
    };
  };
  aclCapabilities                       : {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'both'
    supportedPermissions                :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'propagate'
    propagation                         :      String;
    permissions                         : many {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'cmis:read'
      permission                        :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'cmis:read'
      description                       :      String;
    };
    permissionMapping                   : many {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'canUpdateProperties.Object'
      ![key]                            :      String;
      permission                        : many SdmFetchRepository.anonymous.type1;
    };
  };
  latestChangeLogToken                  :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 1.1
  cmisVersionSupported                  :      String;
  changesIncomplete                     :      Boolean;
  changesOnType                         : many SdmFetchRepository.anonymous.type2;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'sap:builtinanonymous'
  principalIdAnonymous                  :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'sap:builtineveryone'
  principalIdAnyone                     :      String;
  extendedFeatures                      : many {
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'http://docs.oasis-open.org/ns/cmis/extension/contentstreamhash'
    id                                  :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Content Stream Hash'
    commonName                          :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 1
    versionLabel                        :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Adds the property cmis:contentStreamHash which represents the hash of the document content.'
    description                         :      String;
  };
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'https://api-sdm-di-test.cfapps.sap.hana.ondemand.com/browser/Unique%20e%20theosiry'
  repositoryUrl                         :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'https://api-sdm-di-test.cfapps.sap.hana.ondemand.com/browser/Unique%20e%20theosiry/root'
  rootFolderUrl                         :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : '54c16370006fac14ec10fb06'
  cmisRepositoryId                      :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Instant'
  repositoryCategory                    :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'Unique e theosiry'
  externalId                            :      String;
      @Core.Example.$Type : 'Core.PrimitiveExampleValue'
      @Core.Example       : 'service'
  connectionType                        :      String;
};

type SdmFetchRepository_types.error {
  @description        : 'error'
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'internal server error'
  message : String;
};

type SdmFetchRepository_types.invalidflow {
  @description : 'error'
  message : String;
  status  : String;
};

@Core.Example.$Type : 'Core.PrimitiveExampleValue'
@Core.Example       : 'boolean'
type SdmFetchRepository.anonymous.type0 : String;

@Core.Example.$Type : 'Core.PrimitiveExampleValue'
@Core.Example       : 'cmis:write'
type SdmFetchRepository.anonymous.type1 : String;

@Core.Example.$Type : 'Core.PrimitiveExampleValue'
@Core.Example       : 'cmis:document'
type SdmFetchRepository.anonymous.type2 : String;
