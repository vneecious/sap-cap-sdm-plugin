@path: '/read'
service ReadAPI {
    @cds.persistence.skip
    @Sdm.Entity
    @readonly
    entity Files {
        key id           : String  @Sdm.Field: {
                type: 'property',
                path: 'cmis:objectId'
            };
            url          : String  @Core.IsURL  @Core.MediaType: contentType  @Sdm.Field: {type: 'url'};
            contentType  : String  @Core.IsMediaType
                                   @Sdm.Field: {
                type: 'property',
                path: 'cmis:contentStreamMimeType'
            };
            createdBy    : String  @Sdm.Field: {
                type: 'property',
                path: 'cmis:createdBy'
            };
            creationDate : Date    @Sdm.Field: {
                type: 'property',
                path: 'cmis:creationDate'
            };
    }
}
