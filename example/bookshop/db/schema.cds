using {
  Currency,
  managed,
  sap
} from '@sap/cds/common';

namespace sap.capire.bookshop;

entity Books : managed {
  key ID       : Integer;
      title    : localized String(111)  @mandatory;
      descr    : localized String(1111);
      author   : Association to Authors @mandatory;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal;
      currency : Currency;
      images   : Association to many Images
                   on images.book = $self;
}

@Sdm.Entity
entity Images {
  key ID      : String      @Sdm.Field      :        {
        type : 'property',
        path : 'cmis:objectId'
      };
      name    : String      @mandatory  @Sdm.Field : {
        type : 'property',
        path : 'cmis:name'
      };
      content : LargeBinary @Core.MediaType :        'image/png';
      book    : Association to Books;
}

entity Authors : managed {
  key ID           : Integer;
      name         : String(111) @mandatory;
      dateOfBirth  : Date;
      dateOfDeath  : Date;
      placeOfBirth : String;
      placeOfDeath : String;
      books        : Association to many Books
                       on books.author = $self;
}

/**
 * Hierarchically organized Code List for Genres
 */
entity Genres : sap.common.CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres
                   on children.parent = $self;
}
