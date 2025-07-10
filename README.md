# GG Forum API - CI/CD & Security Implementation

## Overview

This project implements a secure forum API with CI/CD implementation as part of the **Menjadi Back-End Developer Expert dengan JavaScript** course on Dicoding's Back-End Developer learning path. This is the second submission that focuses on implementing CI/CD practices and security features to the existing Forum API.

## Features

### Core Features

- **User Management**: Registration, login, logout, and token refresh
- **Thread Management**: Create and view threads
- **Comment Management**: Add and delete comments on threads
- **Reply Management**: Add and delete replies to comments

### CI/CD & Security Features

- **Continuous Integration**: Automated testing pipeline using GitHub Actions
- **Continuous Deployment**: Automated deployment to production server
- **Rate Limiting**: Protection against DDoS attacks
- **HTTPS Protocol**: Secure API access to prevent MITM attacks

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Hapi.js
- **Authentication**: JWT (@hapi/jwt)
- **Database**: PostgreSQL
- **Testing**: Jest
- **CI/CD**: GitHub Actions
- **Web Server**: NGINX (for rate limiting and SSL)
- **SSL Certificate**: Let's Encrypt
- **Architecture**: Clean Architecture

## Project Structure

This project follows Clean Architecture principles with a clear separation of concerns:

```
gg-cicd-forum-api/
├── gg-forum-api/                 # Main application code
│   ├── src/
│   │   ├── Applications/         # Application business rules
│   │   │   ├── security/         # Security interfaces
│   │   │   │   ├── AuthenticationTokenManager.js
│   │   │   │   └── PasswordHash.js
│   │   │   └── use_case/        # Business logic use cases
│   │   │       ├── AddCommentUseCase.js
│   │   │       ├── AddReplyUseCase.js
│   │   │       ├── AddThreadUseCase.js
│   │   │       ├── AddUserUseCase.js
│   │   │       ├── DeleteCommentUseCase.js
│   │   │       ├── DeleteReplyUseCase.js
│   │   │       ├── GetThreadUseCase.js
│   │   │       ├── LikeUnlikeUseCase.js
│   │   │       ├── LoginUserUseCase.js
│   │   │       ├── LogoutUserUseCase.js
│   │   │       └── RefreshAuthenticationUseCase.js
│   │   ├── Commons/              # Shared utilities
│   │   │   ├── exceptions/       # Custom error types
│   │   │   └── ...
│   │   ├── Domains/              # Enterprise business rules
│   │   │   ├── authentications/  # Authentication domain
│   │   │   ├── comments/         # Comments domain
│   │   │   ├── likes/            # Likes domain
│   │   │   ├── replies/          # Replies domain
│   │   │   ├── threads/          # Threads domain
│   │   │   └── users/            # Users domain
│   │   └── Infrastructures/      # External frameworks & tools
│   │       ├── database/         # Database connections
│   │       ├── http/             # HTTP server implementation
│   │       │   ├── _test/        # API endpoint tests
│   │       │   └── createServer.js
│   │       ├── repository/       # Repository implementations
│   │       │   ├── AuthenticationRepositoryPostgres.js
│   │       │   ├── CommentRepositoryPostgres.js
│   │       │   ├── LikeRepositoryPostgres.js
│   │       │   ├── ReplyRepositoryPostgres.js
│   │       │   ├── ThreadRepositoryPostgres.js
│   │       │   └── UserRepositoryPostgres.js
│   │       ├── security/         # Security implementations
│   │       │   ├── BcryptPasswordHash.js
│   │       │   └── JwtTokenManager.js
│   │       └── container.js      # Dependency injection container
│   ├── tests/                    # Test helpers
│   │   ├── AuthenticationsTableTestHelper.js
│   │   ├── CommentsTableTestHelper.js
│   │   ├── EndpointTestHelper.js
│   │   ├── LikesTableTestHelper.js
│   │   ├── RepliesTableTestHelper.js
│   │   ├── ThreadsTableTestHelper.js
│   │   └── UsersTableTestHelper.js
│   └── .env.example              # Environment variables template
├── .github/workflows/            # CI/CD workflow configurations
├── nginx/                        # NGINX configuration files
└── README.md                     # Project documentation
```

This structure adheres to Clean Architecture principles by:

1. **Separation of Concerns**: Each layer has a specific responsibility
2. **Dependency Rule**: Dependencies point inward (domain ← application ← infrastructure)
3. **Entities at the Core**: Domain entities are independent of external frameworks
4. **Use Cases**: Business logic isolated in use case classes
5. **Adapters**: Infrastructure layer adapts external frameworks to the application

The organization ensures testability, maintainability, and makes the system easier to evolve as requirements change.

## CI/CD Implementation

### Continuous Integration

This project uses GitHub Actions to automatically test code changes:

- **Trigger**: Pull requests to the main branch
- **Steps**:
  1. Checkout code
  2. Setup Node.js environment
  3. Install dependencies
  4. Run linting
  5. Setup PostgreSQL for tests
  6. Run all tests (unit, integration, functional)
  7. Report test coverage

### Continuous Deployment

Automated deployment to production server:

- **Trigger**: Push to the main branch
- **Steps**:
  1. Checkout code
  2. Setup Node.js environment
  3. Install dependencies
  4. Build application (if needed)
  5. Deploy to server via SSH
  6. Restart application services

## Security Features

### Rate Limiting

To protect against DDoS attacks, rate limiting has been implemented:

- **Protected Resources**: All `/threads` endpoints and their child paths
- **Limit**: 90 requests per minute per IP address
- **Implementation**: Via NGINX configuration

### HTTPS Implementation

All API endpoints are only accessible via HTTPS:

- **Domain**: [https://major-windows-remain-noisily.a276.dcdg.xyz](https://major-windows-remain-noisily.a276.dcdg.xyz)
- **SSL Certificate**: Let's Encrypt
- **Implementation**: NGINX with SSL configuration

## Getting Started

### Prerequisites

- Node.js (v14 LTS or newer)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/sulhanfuadi/gg-cicd-forum-api.git
   cd gg-forum-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations
   ```bash
   npm run migrate up
   ```

### Running the Application

- Development mode:

  ```bash
  npm run start:dev
  ```

- Production mode:
  ```bash
  npm run start
  ```

## API Documentation

### Authentication

#### Register User

- **POST** users
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "fullname": "string"
  }
  ```

#### Login

- **POST** `/authentications`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

#### Logout

- **DELETE** `/authentications`
- **Request Body**:
  ```json
  {
    "refreshToken": "string"
  }
  ```

### Threads

#### Add Thread

- **POST** `/threads`
- **Headers**: Authorization: Bearer {accessToken}
- **Request Body**:
  ```json
  {
    "title": "string",
    "body": "string"
  }
  ```

#### Get Thread Detail

- **GET** `/threads/{threadId}`

### Comments

#### Add Comment

- **POST** `/threads/{threadId}/comments`
- **Headers**: Authorization: Bearer {accessToken}
- **Request Body**:
  ```json
  {
    "content": "string"
  }
  ```

#### Delete Comment

- **DELETE** `/threads/{threadId}/comments/{commentId}`
- **Headers**: Authorization: Bearer {accessToken}

### Replies

#### Add Reply

- **POST** `/threads/{threadId}/comments/{commentId}/replies`
- **Headers**: Authorization: Bearer {accessToken}
- **Request Body**:
  ```json
  {
    "content": "string"
  }
  ```

#### Delete Reply

- **DELETE** `/threads/{threadId}/comments/{commentId}/replies/{replyId}`
- **Headers**: Authorization: Bearer {accessToken}

### Comment Likes (Optional Feature)

#### Like/Unlike Comment

- **PUT** `/threads/{threadId}/comments/{commentId}/likes`
- **Headers**: Authorization: Bearer {accessToken}
- **Response**:
  ```json
  {
    "status": "success"
  }
  ```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:watch
```

### Testing with Postman

1. Download the [Forum API V2 Test Collection](https://github.com/dicodingacademy/a276-backend-expert-labs/raw/099-shared-content/shared-content/03-submission-content/02-Forum-API-V2/Forum%20API%20V2%20Test.zip)
2. Import both the collection and environment files into Postman
3. Set the base URL in the environment to `https://major-windows-remain-noisily.a276.dcdg.xyz` (no longer resolves)
4. Run the collection tests in sequence using the Collection Runner

## Deployment

**Note: This service is no longer active.** The application was previously deployed at: [https://major-windows-remain-noisily.a276.dcdg.xyz](https://major-windows-remain-noisily.a276.dcdg.xyz) but has been shut down to avoid AWS costs.

- **Server**: AWS EC2 instance (deactivated)
- **IP Address**: 13.250.116.37 (no longer accessible)
- **Domain**: major-windows-remain-noisily.a276.dcdg.xyz (no longer resolves)

## Development Best Practices

1. **Mock Function Return Values**: Don't use expected values as return values for mocked functions
2. **Verify Mocked Functions**: Always verify that mocked functions are called with expected parameters
3. **Business Logic**: Keep business logic in use cases or entities, not in repositories
4. **Integration Tests**: For operations that modify data, verify that the database is actually updated
5. **Authentication**: Keep authentication at the interface level, not in use cases

## Author

- **Sulhan Fuadi** - [sulhanfuadi](https://github.com/sulhanfuadi)

## License

MIT License

Copyright (c) 2025 Sulhan Fuadi
