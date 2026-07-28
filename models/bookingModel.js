import { bookingsDB } from '../db/datastore.js';
import { usersDB } from '../db/datastore.js';

export async function createBooking(userId, courseId) {
    const existing = await bookingsDB.findOne({ userId, courseId });
    if (existing) return existing;
    return await bookingsDB.insert({ userId, courseId });
}

export async function getBookingsForUser(userId) {
    return await bookingsDB.find({ userId });
}

export async function getBookingsForCourse(courseId) {
    return await bookingsDB.find({ courseId });
}

export async function deleteBooking(id) {
    return await bookingsDB.remove({ _id: id });
}

export async function getParticipantsForCourse(courseId) {
    const bookings = await bookingsDB.find({ courseId });
    const participants = await Promise.all(
        bookings.map(async (b) => {
            const user = await usersDB.findOne({ _id: b.userId });
            return { bookingId: b._id, username: user?.username || 'Unknown user' };
        })
    );
    return participants;
}