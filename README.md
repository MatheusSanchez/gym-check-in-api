# SOLID STUDY

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/MatheusSanchez/gym-check-in-api/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/MatheusSanchez/gym-check-in-api/blob/main/README.pt-br.md)

This repository is dedicated to the study of SOLID principles, Design Patterns, unit tests, integration tests, and GitHub Actions.

The structure of this repository includes the development of an API inspired by the GymPass style.

# GymPass API

## How to Execute

1. Clone this repository to your local machine using the following command:
```bash
$ git clone https://github.com/MatheusSanchez/gym-check-in-api
```

2. Navigate to the project directory and install the required dependencies by running:
```bash
$ npm install
```
3. Create a .env file in the project directory to set the required environment variables. Refer to the provided .env.example file for the necessary variables and their values. [.env.example](./.env.example/)

4. Use Docker Compose to set up the database container. Run the following command in the terminal: 
```bash
$ docker compose up -d
```

5. Run Prisma migrations to create the database tables:
```bash
$ npx prisma migrate dev
```

6. Launch the API by running the following command: 
```bash
$ npm run dev
```
Check the terminal for the message: 🔥🔥🔥 HTTP Server Running 🔥🔥🔥


# How to Test

Executing Unit tests is pretty simple; just run the following command:
```bash
$ npm run test
```

## E2E tests
There are two scripts in the [package.json](./package.json/) file to set up the E2E tests, as the tests shouldn't add data to the real database.

You can execute the E2E tests using the following command:
```bash
$ npm run test:e2e
```

This script will trigger all the setup, and a new database will be generated to run the tests, which will be deleted after the tests are completed.

You can also check the tests through  a UI and check the coverage, use the following commands:
```bash
$ npm run test:ui
$ npm run test:coverage
```

## Functional Requirements (RFs)

- [x] User registration should be possible;
- [x] User authentication should be possible;
- [x] Retrieving the profile of a logged-in user should be possible;
- [x] Retrieving the number of check-ins performed by the logged-in user should be possible;
- [x] The user should be able to retrieve their check-in history;
- [x] The user should be able to search for nearby gyms (up to 10km);
- [x] The user should be able to search for gyms by name;
- [x] The user should be able to check-in at a gym;
- [x] Validating a user's check-in should be possible;
- [x] Registering a gym should be possible;

## Business Rules (RNs)

- [x] Users should not be able to register with a duplicated email;
- [x] A user cannot make 2 check-ins on the same day;
- [x] A user cannot check in if not within 100 meters of the gym;
- [x] Check-in validation can only occur up to 20 minutes after its creation;
- [x] Check-in validation can only be performed by administrators;
- [x] Gym registration can only be done by administrators;

## Non-Functional Requirements (RNFs)

- [x] User passwords need to be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [x] User identification should be done through a JWT (JSON Web Token);
