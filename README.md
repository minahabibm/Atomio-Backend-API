# Atomio Backend API

This is an Atomio Backend API for; a completed Topcoder challenge. A backend Application to manage and maintain the activities for Users and Orders.   

Implemented authentication and admin (CRUD) endpoints for the application. The app will begin by mapping the database schema. Then will be ready to accept requests. You need to be authorized to succeffully navigate the routes. You should first make a post request to the login endpoint with a username as a body parameter with any of the users in the database, preferrably use the super Admin account. Then obtain a JWT token to use for all other endpoints as Bearer token.

## Technology Stack
* Node.JS
* Express.js
* Sequelize.js
* Postgresql
* JSON Web Token

## Initial Setup
* Clone the repository.
*  `cd Atomio-Backend-API`
    
### Build and install
Ensure you have: Node.JS, Postgresql.

* Confirm Postgresql is running.
* Make sure the config.js is correctly configured.
* `npm i`
* `npm start`

### Build using Docker (Recommended)
* `docker-compose up`
