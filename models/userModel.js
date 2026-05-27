import { usersDB } from '../db/datastore.js';

export async function createUser(user) { return await usersDB.insert(user); }
export async function findUser(username) { return await usersDB.findOne({ username }); }