# Free-Mentors-Challenge-4
[![Build Status](https://travis-ci.org/gadishimwe/Free-Mentors-Challenge-4.svg?branch=Develop)](https://travis-ci.org/gadishimwe/Free-Mentors-Challenge-4)
[![Coverage Status](https://coveralls.io/repos/github/gadishimwe/Free-Mentors-Challenge-4/badge.svg?branch=Develop)](https://coveralls.io/github/gadishimwe/Free-Mentors-Challenge-4?branch=Develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/69a13d2cfe4f028b957b/maintainability)](https://codeclimate.com/github/gadishimwe/Free-Mentors-Challenge-4/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


>Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.

## Free mentors UI templates are hosted [here](https://gadishimwe.github.io/Free-Mentors/) on gh-pages.


## Free mentors API Endpoints are hosted on [Heroku](https://gad-free-mentors.herokuapp.com/).
To make requests to the API Endpoints easely, you can use [Postman](https://www.getpostman.com)
### Available API Endpoints    
    
|HTTP Method|Endpoint |Description|
|:----------|:---------|:------------|
|GET  |/|Root of API and link to the Documentation
|POST |/api/v1/auth/signup | User can create an account|
|POST |/api/v1/auth/signin | User can sign in |
|PATCH|/api/v1/user/:userId|Admin can change a user to mentor
|GET  |/api/v1/mentors  |user can view all mentors
|GET  |/api/v1/mentors/:mentorId| User can view specific mentor
|POST |/api//v1/sessions |User can create a mentorship session
|PATCH |/api/v1/sessions/:sessionId/accept|A mentor can accept a mentorship session request
|PATCH |/api/v1/sessions/:sessionId/reject|A mentor can reject a mentorship session request
|GET |/api/v1/sessions|Get all mentorship session requests for mentee or mentor
|POST |/api/v1/sessions/:sessionId/review|Review a mentor after a mentorship session
|DELETE |/api/v1/sessions/:sessionId/review|Admin can delete mentorship session review

## Installation
```
$ git clone https://github.com/gadishimwe/Free-Mentors.git
$ cd Free-Mentors
$ npm install
```
## To run the app
```
$ npm run dev
```
## To run the test
```
$ npm run test
```

## Tools and Technologies used
#### Built with
- [Nodejs](https://www.nodejs.org)
- [Expressjs](https://www.expressjs.com)

#### Unit tested with
- [Mocha](https://www.mochajs.org) and [Chai](chaijs.com)
- [Postman](https://www.getpostman.com)

#### Continuous integration and test coverage
- [Travis Ci](https://www.travis-ci.org) for CI
- [Coveralls](https://www.coveralls.io) for test coverage


## Author:
#### Gad Ishimwe
