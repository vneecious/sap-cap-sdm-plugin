using {users} from '../db/users';

@path: '/entity-association'
service UserService {
    entity Users   as projection on users.Users;
    entity Avatars as projection on users.Avatars;
}
