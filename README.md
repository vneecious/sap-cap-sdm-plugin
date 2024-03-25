# SAP CAP SDM Plugin

A plugin made for SAP Cloud Application Programming (CAP) projects, aimed at effortless integration with SAP Document Management Service (SDM). Achieve smooth connections in a 'CAP-ish' style, solely utilizing CDS Annotations. This makes your DMS integrations simpler and more intuitive.

## Project Overview

`sap-cap-sdm-plugin` is a CDS plugin that provides integration to the SAP Document Management service specifically for CAP projects.

## Requirements

To use the all-in-one features provided by this plugin, you'll need a paid instance of the [SAP Document Management service](https://help.sap.com/docs/document-management-service?locale=en-US).

## Installation & Setup

### 1. Installation

Install the plugin using npm with the following command:

```bash
npm install sap-cap-sdm-plugin
```

### 2. Configuration

Include the plugin in the `cds.requires` section of your `package.json`:

```json
"cds": {
    "requires": {
        "sap-cap-sdm-plugin": {
            "impl": "sap-cap-sdm-plugin",
            "settings": {
                "destination": "<YOUR_SDM_DESTINATION_NAME>",
                "repositoryId": "<YOUR_REPOSITORY_ID>"
            }
        }
    }
},
```

### 3. Entity Creation

Set up your entity with the `@Sdm.Entity` annotation. Link your entity properties to CMIS properties using the `@Sdm.Field` annotations:

```cds
service SampleService {
    @cds.persistence.skip
    @Sdm.Entity
    entity Files {
        key id           : String      @Sdm.Field      : { type : 'property', path : 'cmis:objectId' };
            name         : String      @Sdm.Field      : { type : 'property', path : 'cmis:name' };
            content      : LargeBinary @Core.MediaType : contentType  @Core.ContentDisposition.Filename : name;
            contentType  : String      @Core.IsMediaType
                                       @Sdm.Field      : { type : 'property', path : 'cmis:contentStreamMimeType' };
            createdBy    : String      @Sdm.Field      : { type : 'property', path : 'cmis:createdBy' };
            creationDate : Date        @Sdm.Field      : { type : 'property', path : 'cmis:creationDate' };
    }
}
```

### 4. Get Started

After setting up, check your configuration to make sure everything is okay.

## Additional Features

### 1. File URL

Obtain a direct URL to the document by specifying `type: 'link'` within the `@Sdm.Field` annotation.

```cds
    url: String @Sdm.Field : { type : 'link' };
```

### 2. CMIS Client

If the entity annotations don't meet your needs, you can use the CMIS Client to implement your own logic.

This service follows the specs of [SAP Document Management Service, Integration Options - CMIS](https://api.sap.com//package/SAPDocumentManagementServiceIntegrationOptionCMISAPI/rest) from [SAP Business Accelerator Hub](https://api.sap.com/).

#### Usage:

```javascript
const client = await cds.connect.to('cmis-client');
// create a folder in root
await client
  .createFolder('your_repository_id', 'folder_name')
  .execute(destination);
```

Check `test/cmis` for more examples.

Avaiable API:
 - [x] Add Access Control Entries: `addACLProperty`
 - [x] Append Content Stream: `appendContentStream`
 - [x] Cancel Check Out Document: `cancelCheckOut`
 - [x] Check In Document: `checkIn`
 - [x] Check Out Document: `checkOut`
 - [x] CMIS Query: `cmisQuery`
 - [x] Create Document: `createDocument`
 - [x] Create Document from Source: `createDocumentFromSource`
 - [ ] Create Favorite: `TODO`
 - [X] Create Folder: `createFolder`
 - [ ] Create Link: `TODO`
 - [ ] Create Secondary Type: `TODO`
 - [ ] Create Share: `TODO`
 - [X] Delete Object: `deleteObject`
 - [ ] Delete Tree: `TODO`
 - [X] Download a File: `downloadFile`
 - [X] Fetch Repository: `fetchRepository`
 - [ ] Generate Thumbnail: `TODO`
 - [X] Get Access Control List: `getACLProperty`
 - [ ] Get Allowable Actions: `TODO`
 - [ ] Get Children: `TODO`
 - [ ] Get Deleted Children: `TODO`
 - [ ] Get Descendants: `TODO`
 - [ ] Get Folder Tree: `TODO`
 - [X] Get Object: `getObject`
 - [ ] Get Parent: `TODO`
 - [ ] Get Properties: `TODO`
 - [ ] Get Type Children: `TODO`
 - [ ] Get Type Definition: `TODO`
 - [ ] Get Type Descendants: `TODO`
 - [ ] Move Object: `TODO`
 - [ ] Permanently Remove the Object: `TODO`
 - [X] Remove Access Control Entries: `removeACLProperty`
 - [ ] Restore Object: `TODO`
 - [ ] Update Folder, Document, Link Object: `TODO`
 - [X] Update Properties: `updateProperties`
 - [ ] ZIP Content Creation: `TODO`
 - [ ] ZIP Content Download: `TODO`
 - [ ] ZIP Extract and Upload: `TODO`

### 3. SDM Administrative Operations

There's also a service for admin tasks, like adding a new repository. This service comes from the [Document Management Service, Integration Options - AdminAPI](https://api.sap.com/api/AdminAPI/overview).

#### Usage:

```javascript
const admin = await cds.connect.to('sdm-admin');

// add a new repository
await admin.onboardARepository({
  repository: {
    displayName: 'sdm-plugin',
    description: 'sdm-plugin',
    repositoryType: 'internal',
    isVersionEnabled: 'false',
  },
});
```

Check `test/admin` for more examples.

## Limitations

This is an early release, so some SAP DMS features are not yet supported, including:

- Repositories with `isVersionEnabled` set to true;
- Repositories with `isThumbnailEnabled` set to true;
- Bulk upload;
- Bulk download;
