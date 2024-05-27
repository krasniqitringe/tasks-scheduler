# Project Name

## Overview

Briefly describe the purpose and goals of the project.

## Setup Instructions

To set up the project, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Configure the environment variables as specified in `.env.example`.
4. Run the development server with `npm run start:dev`.

## API Documentation

The API documentation can be found in the `/api` directory. This includes details on all available endpoints, request/response formats, and authentication requirements.

## Project Architecture

The project follows a modular architecture with the following structure:

- **Auth Module**

  - Controller: `auth.controller.ts`
  - Service: `auth.service.ts`
  - DTO Folder: Contains DTO files for authentication requests/responses.
  - Schema Folder: Contains schemas related to authentication.

- **Users Module**

  - Controller: `users.controller.ts`
  - Service: `users.service.ts`
  - DTO Folder: Contains DTO files for user requests/responses.
  - Schema Folder: Contains schemas related to users.

- **Tasks Module**

  - Controller: `tasks.controller.ts`
  - Service: `tasks.service.ts`
  - DTO Folder: Contains DTO files for task requests/responses.
  - Schema Folder: Contains schemas related to tasks.

- **Common Folder**
  - **Filters Folder**
    - Exception Filter: Handles exceptions globally.
  - **Interceptors Folder**
    - Pagination Interceptor: Handles pagination of API responses.
    - Response Interceptor: Formats API responses.
  - **Interfaces Folder**
    - Paginated Result Interface: Defines the structure of paginated API responses.
  - **Providers Folder**
    - Database Provider: Handles database connections.
    - Seed Data Provider: Handles generating the first user.
  - **Middlewares Folder**
    - Guard Middleware: Implements JWT authentication.

## Authentication

All APIs are secured with JWT token. The JWT strategy can be found in the `auth` folder.
