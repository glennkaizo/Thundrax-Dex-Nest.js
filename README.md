
## Description

This repository contains the source code for a Cat Adoption Agency API.
It enables management and adoption processes for cats through a RESTful API interface.

## Installation

```bash
$ npm install
```

## Run Postgres Database

```bash
$ docker-compose up
```

## Running the app

```bash
$ npm start
```

## Admin Privileges
Certain API endpoints, such as those for creating, deleting, or updating cat records, are restricted to admin users. To grant admin privileges to a user, update their record in the database to set isAdmin to true.

After modifying a user's admin status, a new authentication token must be obtained by logging in through the API to reflect this change in permissions.
