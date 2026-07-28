Community Learning Hub

A web application for a Community Learning Hub, allowing users to browse and enrol in courses, and allowing organisers to manage courses, participants, and user accounts.

## Live Site
https://community-learning-hub-20tz.onrender.com

(Hosted on Render's free tier — the site may take 30-60 seconds to load if it has been inactive for a while.)

## How to Run Locally

### Prerequisites
- Node.js (v18 or later)
- Git

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/gakjee/community-learning-hub.git
   cd community-learning-hub
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node app.js
   ```
4. Open http://localhost:3000 in your browser

### Creating your first admin account
1. Register an account via the Register page
2. Stop the server
3. Open `db/users.db` in a text editor and manually change that user's `"role":"user"` to `"role":"admin"`
4. Restart the server and log in — you'll now have access to `/admin`

## Features Implemented

### Public (not logged in)
- Homepage with organisation overview
- Course listing showing name, description, sessions, duration, dates, times, location, and price

### Registered Users
- Register and log in (passwords hashed with bcrypt)
- Enrol in courses
- View and cancel their own enrolments

### Organisers (Admin)
- Add, edit, and delete courses
- View a participant list for each course
- Manage users — view all users, delete accounts, promote/demote admin privileges

## Tech Stack
- Node.js / Express
- Mustache (mustache-express) for templating
- NeDB (nedb-promises) for data storage
- express-session for authentication sessions
- bcryptjs for password hashing

## Known Limitations
- NeDB stores data in local files, which are reset on the deployed (Render) version whenever the app restarts — this is a trade-off for using free hosting with local file storage.
- No automated test suite is included; testing approach and test case design are addressed separately in the written report.
