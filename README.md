

# Task Manager API

## Technical Overview

The Task Manager API is a Node.js backend service that showcases my skills as a developer, specifically in building RESTful APIs using Express.js, Mongoose for MongoDB integration, and error handling. This API is designed for managing tasks and serves as a technical demonstration, not intended for production use.

## Features

### Clean Code Structure

- Utilizes a well-organized code structure for maintainability and readability.

### Express.js Server

- Utilizes Express.js as the web framework for handling HTTP requests and routing.

### MongoDB Integration

- Connects to a MongoDB database using Mongoose, allowing efficient storage and retrieval of tasks.

### RESTful API Endpoints

- Defines RESTful API endpoints for task management, including creation, retrieval, updating, and deletion of tasks.

### Error Handling Middleware

- Implements error handling middleware to gracefully handle and log errors, ensuring robust API operation.

## Project Structure

- **`controllers/tasks.js`**: Defines controller functions for handling tasks, including CRUD operations.

- **`db/connect.js`**: Establishes a connection to the MongoDB database using Mongoose.

- **`errors/custom-error.js`**: Defines a custom error class and a function to create custom API errors.

- **`middleware/async.js`**: Provides an async wrapper for route handlers to handle asynchronous operations.

- **`middleware/error-handler.js`**: Error handling middleware to catch and respond to errors.

- **`middleware/not-found.js`**: Middleware for handling routes that do not exist.

- **`models/Tasks.js`**: Defines the MongoDB schema for tasks, including properties like task name and completion status.

- **`routes/tasks.js`**: Defines API routes for task management, including CRUD operations.

## Getting Started

To run this Task Manager API locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/eldad-assaf/task-manager-node-api.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd task-manager-node-api
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Environment Variables:**
   Create a `.env` file and set your MongoDB connection URI and other necessary environment variables.

5. **Start the API:**
   ```bash
   npm start
   ```

The API will start and be accessible at the specified port (default is 3005).

## Api-Docs
http://localhost:3005/api-docs/



Thank you for exploring this Task Manager API. I hope you find it insightful and informative, showcasing my technical skills in Node.js API development.

---
