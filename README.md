# Meetups REST API

This is a simple REST API for managing meetups, built using Node.js and Express.
It includes user authentication via JWT and persistent storage using JSON files.

## Features
- User authentication (Signup & Login)
- JWT-based route protection
- CRUD operations for meetups
- Data storage using JSON files

## Installation & Setup

### Running with Docker
1. Clone the repository:
   ```sh
   git clone https://github.com/mauro-mura/meetups-rest-api.git
   ```
2. Navigate into the project directory:
   ```sh
   cd meetups-rest-api
   ```
3. Start the project using Docker Compose:
   ```sh
   docker compose up -d
   ```
   The server runs on `http://localhost:3000`

### Running Manually
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Users must sign up and log in to receive a token, which is required for protected routes.

### Signup
- **Endpoint:** `POST /auth/signup`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  { "message": "User registered" }
  ```

### Login
- **Endpoint:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  { "token": "your_jwt_token" }
  ```

## Meetups

Meetup-related routes require authentication, except for fetching meetups.

### Create a Meetup
- **Endpoint:** `POST /meetups`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Tech Talk",
    "summary": "Discussion on new tech trends",
    "address": "123 Main St"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Tech Talk",
    "summary": "Discussion on new tech trends",
    "address": "123 Main St"
  }
  ```

### Get All Meetups
- **Endpoint:** `GET /meetups`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Tech Talk",
      "summary": "Discussion on new tech trends",
      "address": "123 Main St"
    }
  ]
  ```

### Update a Meetup
- **Endpoint:** `PATCH /meetups/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (any field can be updated):**
  ```json
  {
    "title": "Updated Tech Talk"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "title": "Updated Tech Talk",
    "summary": "Discussion on new tech trends",
    "address": "123 Main St"
  }
  ```

### Delete a Meetup
- **Endpoint:** `DELETE /meetups/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `204 No Content`

## Error Handling
The API returns structured error responses:
```json
{
  "message": "Error description"
}
```

## License
This project is open-source under the MIT License.
