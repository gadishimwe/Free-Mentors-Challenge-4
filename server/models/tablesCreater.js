import pool from '../config/dbConfig';


console.log(process.env.NODE_ENV);


const createTables = `
DROP TABLE IF EXISTS users, sessions, reviews;
    CREATE TABLE IF NOT EXISTS users(
        userid SERIAL PRIMARY KEY,
        email VARCHAR(30) UNIQUE NOT NULL,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        password VARCHAR(256) NOT NULL,
        address VARCHAR(50),
        bio VARCHAR(256),
        occupation VARCHAR(50),
        expertise VARCHAR(50),
        isAdmin BOOLEAN DEFAULT FALSE,
        isMentor BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE IF NOT EXISTS sessions(
        sessionId SERIAL PRIMARY KEY,
        mentorId INT NOT NULL,
        menteeId INT NOT NULL,
        questions VARCHAR(256) NOT NULL,
        menteeEmail VARCHAR(30) NOT NULL,
        status VARCHAR(10) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews(
        reviewId SERIAL PRIMARY KEY,
        sessionId INT NOT NULL,
        mentorId INT NOT NULL,
        menteeId INT NOT NULL,
        score INT NOT NULL,
        menteeFullName VARCHAR(40) NOT NULL,
        remark VARCHAR(256) NOT NULL
    );
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(0, 'gad@gmail.com', 'Gad', 'Ishimwe', '$2b$10$v/wytTmVxffpjPLlZ95EB.cWZLZISlk.o0Y7jy7oxLzNw3DTx2Shm', 'kigali', 'I am software developer', 'coding', 'javascript', 'true', 'false');
  `;

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  console.log(err.message);
  process.exit(0);
});
