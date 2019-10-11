/* eslint-disable max-len */
import bcrypt from 'bcrypt';
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
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(100, 'gad@gmail.com', 'Gad', 'Ishimwe', '$2b$10$v/wytTmVxffpjPLlZ95EB.cWZLZISlk.o0Y7jy7oxLzNw3DTx2Shm', 'kigali', 'I am software developer', 'coding', 'javascript', 'true', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(1000, 'user1@gmail.com', 'Gad', 'Ishimwe', '$2b$10$TxwV2Kv8nhxILMAI8hYB9ehmMW7zBjgl2qZSljhIfqkDhvEv86wdi', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(2000, 'user2@gmail.com', 'Gad', 'Ishimwe', '$2b$10$iA4O.qxaDX8PN7dFALhZJOLKokdB/Fwe2mEPa3YEV08D3ROf2EhOC', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(3000, 'user3@gmail.com', 'Gad', 'Ishimwe', '$2b$10$gFKEE0PID4JBFN.920pDCuF1qvKND6HCMmOmdwHaxScd56kPE/8p6', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(4000, 'user4@gmail.com', 'Gad', 'Ishimwe', '$2b$10$4rjvwFBheV.waOZxL4eBAu9HEcbrBZvslFPN1jLfydE5GoNifts2e', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(5000, 'user5@gmail.com', 'Gad', 'Ishimwe', '$2b$10$D3oWHwYwgoEa011yukNQoemC5zfeVEjjHXxmlEafelwT9VJtCfyxG', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(6000, 'user6@gmail.com', 'Gad', 'Ishimwe', '$2b$10$cC8rzbbIy76L19uj7VQj/.zIJ0DnI.0SUlBGeVfNmqAZUQaB88hXC', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'false');

    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(1001, 'mentor1@gmail.com', 'Gad', 'Ishimwe', '$2b$10$z0hYzpXomMz4FNSknpEqcez2spAACsm0RqDK71svXPzMUyvGWfJ8m', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(2002, 'mentor2@gmail.com', 'Gad', 'Ishimwe', '$2b$10$qYoQ3sH85zzNBdmYt1bg/OzKHyZuJo03bFcCSsTVXuxl.SZz8Y0yS', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(3003, 'mentor3@gmail.com', 'Gad', 'Ishimwe', '$2b$10$ArnyblfTn0OIbasFmy5EAOaSduL2QA8qsJOH8.S7SMlymqS2eT8hK', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(4004, 'mentor4@gmail.com', 'Gad', 'Ishimwe', '$2b$10$SB37gZ68oxNUeTyV5H4KFeFiT67bqoU2QUk1WYRh.7F35L86FeAZC', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(5005, 'mentor5@gmail.com', 'Gad', 'Ishimwe', '$2b$10$ymoCfwL8FsRHQ0AmZ48l0OV1vB3Cqe7jPRJ7.2hPcyoihp9VH0Rca', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');
    INSERT INTO users (userid, email, firstname, lastname, password, address, bio, occupation, expertise, isadmin, ismentor) VALUES(6006, 'mentor6@gmail.com', 'Gad', 'Ishimwe', '$2b$10$6SvujBzCTf0K2GP19kYZle6HE86PusK9fiu3biNeNigrbOoebLJgm', 'kigali', 'I am software developer', 'coding', 'javascript', 'false', 'true');

    INSERT INTO sessions (sessionId, mentorId, menteeId, questions, menteeEmail, status) VALUES(1000, 4004, 4000, 'how can you.....?', 'user4@gmail.com', 'pending');
    INSERT INTO sessions (sessionId, mentorId, menteeId, questions, menteeEmail, status) VALUES(2000, 5005, 5000, 'how can you.....?', 'user5@gmail.com', 'accepted');
    INSERT INTO sessions (sessionId, mentorId, menteeId, questions, menteeEmail, status) VALUES(3000, 6006, 6000, 'how can you.....?', 'user6@gmail.com', 'rejected');
    INSERT INTO sessions (sessionId, mentorId, menteeId, questions, menteeEmail, status) VALUES(4000, 5005, 2000, 'how can you.....?', 'user2@gmail.com', 'pending');
  `;

pool.query(createTables).then(() => {
  console.log('Tables created');
}).catch((err) => {
  console.log(err.message);
  process.exit(0);
});
