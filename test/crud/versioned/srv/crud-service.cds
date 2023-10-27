@path : '/crud-2'
service APIService {
    @cds.persistence.skip
    @Sdm.Entity
    entity Files {
        key id           : String      @Sdm.Field      : {
                type : 'property',
                path : 'cmis:objectId'
            };
            name         : String      @Sdm.Field      : {
                type : 'property',
                path : 'cmis:name'
            };
            content      : LargeBinary @Core.MediaType : contentType  @Core.ContentDisposition.Filename : name;
            contentType  : String      @Core.IsMediaType
                                       @Sdm.Field      : {
                type : 'property',
                path : 'cmis:contentStreamMimeType'
            };
            createdBy    : String      @Sdm.Field      : {
                type : 'property',
                path : 'cmis:createdBy'
            };
            creationDate : Date        @Sdm.Field      : {
                type : 'property',
                path : 'cmis:creationDate'
            };
    }
}

// workarount to serve admin service in cds.test
using {SdmAdmin} from '../../../../srv/admin/Admin';
