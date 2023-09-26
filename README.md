# SAP CAP SDM Plugin

An SAP CAP plugin designed for effortless integration with SAP Document Management Service. Achieve seamless connections in a 'CAP-ish' way, purely leveraging CDS Annotations. Simplify your DMS integrations and make them more intuitive.

> Note: This is a work in progress.

## Installation & Setup

### 1. Installation

Install the plugin using npm:

```bash
npm install sap-cap-sdm-plugin
```

### 2. Configuration

Add the plugin to the `cds.requires` section in your `package.json`:

```json
"cds": {
    "requires": {
        "sap-cap-sdm-plugin": {
            "impl": "sap-cap-sdm-plugin",
            "settings": {
                "destination": "<YOUR_SDM_DESTINATION_NAME>",
                "repositoryId": "<YOUR_REPOSITORY_ID>" // Optional. Remove if you have only one repository.
            }
        }
    }
},
```

### 3. Entity Creation

Define your entity with the `@Sdm.Entity` annotation. Map your entity properties to CMIS properties using the `@Sdm.Field` annotations:

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

After setting up, test your configuration to ensure everything is in order.

## Features

- [x] Basic CRUD operations
- [ ] Check-in Check-out flow for versioned repositories
- [ ] Support for multiple entities
- [ ] Thumbnail generation
... and more features in the pipeline!
