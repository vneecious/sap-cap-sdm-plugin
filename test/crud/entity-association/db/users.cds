namespace users;

entity Users {
    name : String;
}

entity Avatars {
    id : String @Sdm.Field: {
        type: 'property',
        path: 'cmis:objectId'
    };
    content: LargeBinary @Core.MediaType: imageType
}
