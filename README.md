# 🏠 Room Rent Backend API

This is the **backend** for the Room Rent platform, built using **NestJS** and **MongoDB**. It provides a RESTful API for managing rooms, users, bookings, payments, and more.

## 🚀 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT & bcrypt
- **Validation**: class-validator, class-transformer
- **Environment**: Node.js, TypeScript



## 🧪 Features

- 🔐 Secure JWT-based authentication
- 🧑‍💼 Role-based access (landlord, tenant, admin)
- 🏠 CRUD operations for room listings
- 📅 Room booking with availability checks
- 💳 (Optional) Payment integration ready
- 📦 Modular and scalable folder structure

---

## 📦 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/adnanhjoy/room-rent-server
cd room-rent-server


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.


