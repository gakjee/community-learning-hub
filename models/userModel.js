import { usersDB } from '../db/datastore.js';
import bcrypt from 'bcryptjs';

export async function createUser({ username, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await usersDB.insert({
        username,
        password: hashedPassword,
        role: role || 'user'
    });
}

export async function findUser(username) {
    return await usersDB.findOne({ username });
}

export async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function getAllUsers() {
    return await usersDB.find({}, { password: 0 }); // exclude password hashes
}

export async function deleteUser(id) {
    return await usersDB.remove({ _id: id });
}

export async function updateUserRole(id, role) {
    return await usersDB.update({ _id: id }, { $set: { role } });
}