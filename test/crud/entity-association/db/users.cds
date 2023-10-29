namespace users;

entity Users {
    key id     : Int16;
        name   : String;
        avatar : Association to Avatars
                     on avatar.user = $self;
}

@Sdm.Entity
entity Avatars {
    key id           : UUID        @Sdm.Field     : {
            type: 'property',
            path: 'cmis:name'
        };
        content      : LargeBinary @Core.MediaType: imageType;
        imageType    : String      @Core.IsMediaType  @Sdm.Field: {
            type: 'property',
            path: 'cmis:contentStreamMimeType'
        };
        cmisObjectId : String      @Sdm.Field     : {
            type: 'property',
            path: 'cmis:objectId'
        };
        user         : Association to one Users;
}
