# chai-backend  
_A backend project for a video hosting app built with Node.js & MongoDB._

## Table of Contents  
- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [Project Structure](#project-structure)  
- [License](#license)  

---

## About  
This project is the backend for a full-featured video hosting application (think: something like YouTube). It supports user authentication (signup/login), uploading videos, liking/disliking, commenting, subscriptions, and more. The focus is on covering real-world backend patterns including JWT authentication, refresh tokens, file uploads, and database relations.

## Features  
- ✅ User registration & login  
- ✅ JWT / Refresh Tokens for authentication  
- ✅ Video upload (with metadata)  
- ✅ Like / Dislike videos  
- ✅ Comments & replies  
- ✅ Subscribe / Unsubscribe to channels  
- ✅ Secure password hashing (bcrypt)  
- ✅ MongoDB + Mongoose for data modelling  
- ✅ Express for REST API  
- ✅ Middleware for authentication, error handling, validation  

## Tech Stack  
- **Node.js**  
- **Express.js**  
- **MongoDB** (via Mongoose)  
- **JWT** for auth  
- **bcrypt** for password hashing  
- Other utilities: multer (for uploads), cloud storage (if used), custom middleware, etc.  

## Getting Started  

### Prerequisites  
- Node.js (v14+ recommended)  
- npm or yarn  
- MongoDB running (local or cloud)  

### Installation  
```bash  
git clone https://github.com/Pratik-0309/chai-backend.git  
cd chai-backend  
npm install  
