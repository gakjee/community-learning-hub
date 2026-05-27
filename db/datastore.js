import Datastore from 'nedb-promises';

export const coursesDB = Datastore.create({ filename: './db/courses.db', autoload: true });
export const usersDB = Datastore.create({ filename: './db/users.db', autoload: true });