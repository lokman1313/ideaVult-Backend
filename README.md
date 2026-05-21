# 🚀 IdeaVault - Server Side

This is the backend API for IdeaVault, a startup idea sharing platform. The server manages authentication, idea management, comments, user interactions, and database operations.

## 🌐 API Base URL

🔗 https://idea-vult-backend.vercel.app/

## 📌 Features

- RESTful API Architecture
- MongoDB Database Integration
- JWT Authentication & Authorization
- Secure Private Routes
- Startup Idea CRUD Operations
- Comment CRUD Operations
- User-Based Data Access
- Trending Ideas Query Support
- Search Ideas using MongoDB Regex
- Category-Based Filtering
- CORS Configuration
- Environment Variable Security

## 🛠️ Technologies Used

### Backend

- Express.js
- MongoDB
- jose-cjs
- Cors
- Dotenv

## 📂 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------|
| POST | /jwt |

### Ideas

| Method | Endpoint |
|----------|----------|
| GET | /ideas |
| GET | /ideas/:id |
| POST | /ideas |
| PATCH | /ideas/:id |
| DELETE | /ideas/:id |
| GET | /ideas/user/:email |

### Comments

| Method | Endpoint |
|----------|----------|
| GET | /comments |
| POST | /comments |
| PATCH | /comments/:id |
| DELETE | /comments/:id |
| GET | /comments/user/:email |

## 🔒 Security Features

- JWT Token Verification
- Protected API Routes
- Environment Variable Protection
- CORS Configuration

## 📊 Database Collections

### ideas

Stores startup idea information:

- title
- shortDescription
- detailedDescription
- category
- tags
- imageUrl
- budget
- audience
- problemStatement
- proposedSolution
- userEmail
- createdAt

### comments

Stores user comments:

- ideaId
- userName
- userEmail
- comment
- createdAt

## 👨‍💻 Developer

Lokman Hossen
