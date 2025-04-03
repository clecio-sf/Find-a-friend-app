# FindAFriend APP

This project was developed as part of the **Node.js Training Program** by [Rocketseat](https://www.rocketseat.com.br/), specifically for a challenge in the **Solid API module**. The main goal of this challenge was to build a backend application focused on clean architecture, SOLID principles, and scalable design using the JavaScript/TypeScript ecosystem.

The application simulates a **pet adoption platform**, where organizations (ORGs) can register pets and users can browse available pets for adoption based on city and other characteristics. It was built following best practices in API design, authentication, and database modeling.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Functional Requirements (FR)](#functional-requirements-fr)
- [Business Rules (BR)](#business-rules-br)
- [Non-Functional Requirements (NFR)](#non-functional-requirements-nfr)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Run Migrations and Start the Server](#run-migrations-and-start-the-server)

---

## Technologies Used

- Node.js
- TypeScript
- PostgreSQL
- JWT (JSON Web Token)
- Prisma ORM
- Zod (schema validation)
- Fastify


---

## Functional Requirements (FR)

| Code  | Description                                                                          |
|-------|--------------------------------------------------------------------------------------|
| FR-01 | It must be possible to register a pet                                                |
| FR-02 | It must be possible to list all available pets for adoption in a given city         |
| FR-03 | It must be possible to filter pets by characteristics                               |
| FR-04 | It must be possible to view detailed information about a pet                        |
| FR-05 | It must be possible to register as an ORG                                           |
| FR-06 | It must be possible to log in as an ORG                                             |

---

## Business Rules (BR)

| Code  | Description                                                                 |
|-------|-----------------------------------------------------------------------------|
| BR-01 | A city must be provided in order to list pets                              |
| BR-02 | An ORG must have a valid address and WhatsApp number                        |
| BR-03 | Every pet must be associated with an ORG                                   |
| BR-04 | Users will contact ORGs directly via WhatsApp to adopt a pet               |
| BR-05 | All filters besides city are optional                                      |
| BR-06 | ORGs must be logged in to access admin features                            |

---

## Non-Functional Requirements (NFR)

| Code   | Description                                                               |
|--------|---------------------------------------------------------------------------|
| NFR-01 | Passwords must be stored in a hashed format                               |
| NFR-02 | All data must be stored in a PostgreSQL database                          |
| NFR-03 | All listings must support pagination                                      |
| NFR-04 | Authentication must be handled with JWT tokens                            |

---

## API Endpoints

```markdown
| Method | Route                     | Description                                | Auth Required     |
|--------|---------------------------|--------------------------------------------|-------------------|
| POST   | `/orgs`                   | Register a new ORG                         | No                |
| POST   | `/orgs/login`             | Authenticate an ORG                        | No                |
| GET    | `/orgs/validate/:orgId`   | Validate ORG (admin only)                  | Yes (JWT + ADMIN) |
| POST   | `/pets`                   | Register a new pet                         | Yes               |
| GET    | `/pets/search`            | Search pets by city and filters            | No                |
| GET    | `/pets/search/:id`        | Get pet details by ID                      | No                |

```
---

## Installation

````bash

git clone https://github.com/clecio-sf/Find-a-friend-app.git

cd find-a-friend-app

npm install

````
## Environment Configuration

Create a `.env` file in the root of the project and set the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/findafriend"

JWT_SECRET="your_jwt_secret"
```
## Run Migrations and Start the Server

```bash
npx prisma migrate dev

npm run start:dev
```
