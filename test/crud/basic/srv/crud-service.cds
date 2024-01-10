/**
 * Basic CRUD scenario
 */
@path: '/crud'
service CrudAPI {
    @cds.persistence.skip
    @Sdm.Entity
    entity Files {
        key id           : String       @Sdm.Field     : {
                type: 'property',
                path: 'cmis:objectId'
            };
            name         : String       @Sdm.Field     : {
                type: 'property',
                path: 'cmis:name'
            };
            content      : LargeBinary  @Core.MediaType: contentType  @Core.ContentDisposition.Filename: name;
            contentType  : String       @Core.IsMediaType
                                        @Sdm.Field     : {
                type: 'property',
                path: 'cmis:contentStreamMimeType'
            };
            createdBy    : String       @Sdm.Field     : {
                type: 'property',
                path: 'cmis:createdBy'
            };
            creationDate : Date         @Sdm.Field     : {
                type: 'property',
                path: 'cmis:creationDate'
            };
    }

    /**
     * THIS IS ONLY FOR TESTING PURPOSES. YOU DON'T NEED THIS
     * ACTION
     *
     * This action was specifically implemented to address the
     * following issue <https://github.com/vneecious/sap-cap-sdm-plugin/issues/12>
     */
    action createFile(file : Files);

}
