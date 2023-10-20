@path                               : '/sdm-plugin/admin'
@Capabilities.BatchSupported        : false
@Capabilities.KeyAsSegmentSupported : true
@Core.Description                   : 'Administrative Operations'
@Core.LongDescription               : 'These APIs uses the SAP Document Management service, Integration Option to perform various administrative operations. Using these APIs, you can perform various actions like onboard, offboard, edit, synchronize, call for repository and access the Rest APIs to get the usage details of processed repositories.'
service SdmAdmin {};

@Common.Label         : 'List Repositories'
@Core.Description     : 'A successful response to the GET request returns all the repositories you have added.'
@Core.LongDescription : 'Retrieve all onboarded repositories. When only one repository is onboarded, the response will be an object and when there are 2 or more repositories, the response will be an array.'
function SdmAdmin.listRepositories() returns SdmAdminTypes.ListARepo;

@Common.Label         : 'Onboard a Repository'
@Core.Description     : 'A successful response to the POST request creates a repository based on the sending parameters.'
@Core.LongDescription : 'Connect your Document Management, integration option instance with Document Management, repository option for the file storage.'
action SdmAdmin.onboardARepository(repository : SdmAdmin.anonymous.XorInternalRepoRequestExternalRepoRequest) returns SdmAdminTypes.Repository;

@Common.Label         : 'Delete Repositories'
@Core.Description     : 'Delete all the onboard repositories.'
@Core.LongDescription : 'A successful response to the DELETE request removes all onboard repositories.'
action SdmAdmin.deleteRepositories() returns SdmAdminTypes.DeleteRepos;

@Common.Label         : 'Fetch a Repository'
@Core.Description     : 'Fetch the details of a repository.'
@Core.LongDescription : 'A successful response to the GET request for a given repository ID returns the details of that particular repository.'
function SdmAdmin.fetchARepository(id : String) returns SdmAdminTypes.RepoAndConnectionInfos;

@Common.Label         : 'Update a Repository'
@Core.Description     : 'Update few parameters of an existing repository.'
@Core.LongDescription : 'A successful response to the PUT request that reflects the updated parameters for your repository.'
action SdmAdmin.updateARepository(id : String, body : SdmAdminTypes.UpdateRepo) returns SdmAdminTypes.Repository;

@Common.Label         : 'Delete a Repository'
@Core.Description     : 'Delete an onboard repository with an unique ID.'
@Core.LongDescription : 'A successful response to the DELETE request removes the onboard repository with an unique ID.'
action SdmAdmin.deleteARepository(id : String) returns SdmAdminTypes.DeleteRepo;

@Common.Label         : 'Sync Repositories'
@Core.Description     : 'Syncs all the repositories onbaord.'
@Core.LongDescription : 'A successful  response to the GET request, you can sync the metadata of the repositories as an administrator with Document Management, integration option.'
function SdmAdmin.syncRepositories() returns SdmAdminTypes.SyncRepos;

@Common.Label         : 'Sync a Repository'
@Core.Description     : 'Sync an individual repository.'
@Core.LongDescription : 'A successful  response to the GET request, you can sync the metadata of a repository as an administrator with Document Management, integration option.'
function SdmAdmin.syncARepository(id : String) returns SdmAdminTypes.SyncRepos;

@Common.Label         : 'Count Repositories'
@Core.Description     : 'Count all the repositories onboard.'
@Core.LongDescription : 'A successful response to the GET request returns the number of all repositories you''ve added.'
function SdmAdmin.countRepositories() returns SdmAdminTypes.Count;

@Common.Label         : 'Get API Call Metrics'
@Core.Description     : 'Checks the API usage of service instance .'
@Core.LongDescription : 'A successful response to the GET request returns the number of API calls made by the service instance. By default, you see the API calls that are made in the current month by each tenant that consumes the service instance.'
function SdmAdmin.getAPICallMetrics() returns SdmAdminTypes.UsageApi;

@Common.Label         : 'Get Storage Metrics'
@Core.Description     : 'Measures the storage consumption offered by the service instance.'
@Core.LongDescription : 'A successful response to the GET request  returns the bytes that are consumed by the service instance. By default, you see the bytes consumed by each repository of the consuming tenants of the service instance, in the current month.'
function SdmAdmin.getStorageMetrics(unit : String, fromMonth : String, fromYear : String) returns SdmAdminTypes.UsageStorage;

@Common.Label         : 'Repository Off-Board'
@Core.Description     : 'Off-Board Repository'
@Core.LongDescription : 'A successful response to the POST request returns the repository off-board recorded.'
action SdmAdmin.repositoryOffBoard(id : String) returns String;

@Common.Label         : 'Repository Off-Board Status'
@Core.Description     : 'Status of Repository Off-Board'
@Core.LongDescription : 'A successful response to the GET request for repository off-board status.'
function SdmAdmin.repositoryOffBoardStatus(id : String) returns Boolean;

@Common.Label         : 'Download off-boarded repository'
@Core.Description     : 'Download of off-boarded repository'
@Core.LongDescription : 'A successful response to the GET request to download the off-boarded repository.'
function SdmAdmin.downloadOffBoardedRepository(id : String) returns Boolean;

@Common.Label         : 'Create Config'
@Core.Description     : 'Create a Config'
@Core.LongDescription : 'A successful response to the POST request creates a Config based on the sending parameters.'
action SdmAdmin.createConfig(body : SdmAdminTypes.CreateConfig) returns SdmAdminTypes.ConfigDetail;

@Common.Label         : 'Get Configs'
@Core.Description     : 'Fetches all Configs'
@Core.LongDescription : 'A successful response to the GET request returns all Configs.'
function SdmAdmin.getConfigs() returns SdmAdminTypes.ConfigsApi;

@Common.Label         : 'Update Config'
@Core.Description     : 'Update a config'
@Core.LongDescription : 'A successful response to the PUT request reflects the updated parameters for your Config.'
action SdmAdmin.updateConfig(id : String, body : SdmAdminTypes.UpdateConfig) returns SdmAdminTypes.ConfigDetail;

@Common.Label         : 'Delete Config'
@Core.Description     : 'Delete a Config with a unique ID.'
@Core.LongDescription : 'A successful response to the DELETE request removes the Config.'
action SdmAdmin.deleteConfig(id : String) returns SdmAdminTypes.DeleteConfig;

type SdmAdminTypes.invalid_repo {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'There is no repository with the given ID:a123'
  message : String;
};

type SdmAdminTypes.error {
  @description        : 'Error message'
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'Internal server error.'
  message : String;
};

type SdmAdminTypes.Count {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 3
  count : Integer;
};

type SdmAdminTypes.Connection {
  type        : String;
  destination : String;
};

type SdmAdminTypes.RepositoryParams {
  paramName  : String;
  paramValue : Boolean;
};

type SdmAdminTypes.InternalRepoRequest {
  displayName               : String;
  description               : String;
  repositoryType            : String;
  repositoryCategory        : String;
  isVersionEnabled          : String;
  isVirusScanEnabled        : String;
  skipVirusScanForLargeFile : String;
  hashAlgorithms            : String;
  isThumbnailEnabled        : String;
  isEncryptionEnabled       : String;
  externalId                : String;
  isContentBridgeEnabled    : String;
};

type SdmAdminTypes.ExternalRepoRequest {
  repository : SdmAdminTypes.RepositoryRequest;
  connection : SdmAdminTypes.ConnectionRequest;
};

type SdmAdminTypes.ConnectionRequest {
  destinationName : String;
  displayName     : String;
  description     : String;
};

type SdmAdminTypes.RepositoryRequest {
  displayName      :      String;
  description      :      String;
  repositoryType   :      String;
  repositoryId     :      String;
  externalId       :      String;
  repositoryParams : many SdmAdminTypes.RepositoryParams;
};

type SdmAdminTypes.Repository {
  cmisRepositoryId   :      String;
  createdTime        :      String;
  description        :      String;
  id                 :      String;
  lastUpdatedTime    :      String;
  name               :      String;
  repositoryCategory :      String;
  repositoryParams   : many SdmAdminTypes.RepositoryParams;
  repositorySubType  :      String;
  repositoryType     :      String;
};

type SdmAdminTypes.RepoAndConnectionInfos {
  connection : SdmAdminTypes.Connection;
  repository : SdmAdminTypes.Repository;
};

type SdmAdminTypes.ListARepo {
  repoAndConnectionInfos : many SdmAdminTypes.RepoAndConnectionInfos;
};

type SdmAdminTypes.SyncRepos {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'Sync successful'
  message : String;
};

type SdmAdminTypes.UsageStorage {
  metric                    :      String;
  month                     :      String;
  numberOfConsumers         :      String;
  perTenantStorageUsageList : many SdmAdminTypes.StorageData;
};

type SdmAdminTypes.StorageData {
  numberOfRepositories      : String;
  storageUsagePerRepository : SdmAdminTypes.PerRepo;
  tenantId                  : String;
  tenantSubDomain           : Integer;
};

type SdmAdminTypes.PerRepo {
  metrics        : String;
  repositoryId   : String;
  repositoryName : String;
  usage          : Integer;
};

type SdmAdminTypes.UsageApi {
  metric                :      String;
  month                 :      String;
  numberOfConsumers     :      String;
  perTenantApiUsageList : many SdmAdminTypes.TenantData;
};

type SdmAdminTypes.TenantData {
  tenantId        : String;
  tenantSubDomain : String;
  units           : String;
  usage           : Integer;
};

type SdmAdminTypes.DeleteRepos {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'All Repositories associated with the instance have been deleted.'
  message : String;
};

type SdmAdminTypes.DeleteRepo {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'Repository with id:06a23283-f3djdjdjjddjdj deleted.'
  message : String;
};

type SdmAdminTypes.UpdateRepo {
  repository : SdmAdminTypes.UpdateRepositoryFields;
};

type SdmAdminTypes.UpdateRepositoryFields {
  description               : String;
  isVirusScanEnabled        : Boolean;
  skipVirusScanForLargeFile : Boolean;
};

type SdmAdminTypes.OffBoardStatus {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 3
  bytesWritten          : Integer;
  path                  : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 3
  percentage            : Integer;
  repositoryId          : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 3
  repositorySizeInBytes : Integer;
  status                : String;
  timeStamp             : Decimal;
};

type SdmAdminTypes.CreateConfig {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'BlockedMimeTypeList'
  configName  : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '.bat'
  configValue : String;
};

type SdmAdminTypes.UpdateConfig {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '421429e1-f9b3-4c7b-8c65-5f4d97b64efc'
  id                : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'tempspaceMaxContentSize'
  configName        : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '8000'
  configValue       : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '842f2d25-bdaf-434b-9505-f5bf6b5119ed'
  serviceInstanceId : String;
};

type SdmAdminTypes.DeleteConfig {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '{}'
  message : String;
};

type SdmAdminTypes.ConfigsApi : many SdmAdminTypes.ConfigDetail;

type SdmAdminTypes.ConfigDetail {
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'BlockedMimeTypeList'
  configName        : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '.bat'
  configValue       : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '2022-12-09T11:26:46.038Z'
  createdTime       : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '421429e1-f9b3-4c7b-8c65-5f4d97b64efc'
  id                : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : '2022-12-09T11:26:46.038Z'
  lastUpdatedTime   : String;
  @Core.Example.$Type : 'Core.PrimitiveExampleValue'
  @Core.Example       : 'af2163c5-7d3e-442a-83c5-7612d7fb7c80'
  serviceInstanceId : String;
};

type SdmAdmin.anonymous.XorInternalRepoRequestExternalRepoRequest : SdmAdminTypes.InternalRepoRequest, SdmAdminTypes.ExternalRepoRequest {};
