# Response Standards

Standardized response formats for REST API consistency.

## Success Response Format

### Standard Success Response

```typescript
interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// Example
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Success with Message

```typescript
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011"
  },
  "message": "User created successfully"
}
```

### Success with Pagination

```typescript
interface PaginatedResponse<T = any> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Example
{
  "success": true,
  "data": [
    { "id": "1", "name": "User 1" },
    { "id": "2", "name": "User 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Error Response Format

### Standard Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}

// Example
{
  "success": false,
  "error": "User not found"
}
```

### Error with Details

```typescript
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

## HTTP Status Codes

### Success Codes (2xx)

```typescript
// 200 OK - Successful GET, PUT, PATCH
res.status(200).json({ success: true, data: user });

// 201 Created - Successful POST
res.status(201).json({ success: true, data: newUser });

// 204 No Content - Successful DELETE (no response body)
res.status(204).send();
```

### Client Error Codes (4xx)

```typescript
// 400 Bad Request - Invalid request data
res.status(400).json({ success: false, error: 'Invalid request' });

// 401 Unauthorized - Authentication required
res.status(401).json({ success: false, error: 'Authentication required' });

// 403 Forbidden - Authenticated but not authorized
res.status(403).json({ success: false, error: 'Access denied' });

// 404 Not Found - Resource not found
res.status(404).json({ success: false, error: 'User not found' });

// 409 Conflict - Duplicate resource
res.status(409).json({ success: false, error: 'Email already exists' });

// 422 Unprocessable Entity - Validation failed
res.status(422).json({ success: false, error: 'Validation failed' });
```

### Server Error Codes (5xx)

```typescript
// 500 Internal Server Error - Server error
res.status(500).json({ success: false, error: 'Internal server error' });

// 503 Service Unavailable - Service temporarily unavailable
res.status(503).json({ success: false, error: 'Service unavailable' });
```

## Response Helper Functions

### Success Response Helpers

```typescript
// utils/response.ts
import { Response } from 'express';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
) => {
  res.status(statusCode).json({
    success: true,
    data,
    ...(message && { message })
  });
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message?: string
) => {
  sendSuccess(res, data, 201, message);
};

export const sendNoContent = (res: Response) => {
  res.status(204).send();
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  }
) => {
  res.status(200).json({
    success: true,
    data,
    pagination: {
      ...pagination,
      totalPages: Math.ceil(pagination.total / pagination.limit)
    }
  });
};
```

### Error Response Helpers

```typescript
export const sendError = (
  res: Response,
  error: string,
  statusCode: number = 500,
  details?: any
) => {
  res.status(statusCode).json({
    success: false,
    error,
    ...(details && { details })
  });
};

export const sendBadRequest = (
  res: Response,
  error: string,
  details?: any
) => {
  sendError(res, error, 400, details);
};

export const sendUnauthorized = (
  res: Response,
  error: string = 'Unauthorized'
) => {
  sendError(res, error, 401);
};

export const sendForbidden = (
  res: Response,
  error: string = 'Forbidden'
) => {
  sendError(res, error, 403);
};

export const sendNotFound = (
  res: Response,
  resource: string = 'Resource'
) => {
  sendError(res, `${resource} not found`, 404);
};

export const sendConflict = (
  res: Response,
  error: string,
  details?: any
) => {
  sendError(res, error, 409, details);
};
```

## Usage Examples

### CRUD Operations

```typescript
import { sendSuccess, sendCreated, sendNoContent, sendNotFound } from '../utils/response';

// GET /users - List all
export const listUsers = async (req, res, next) => {
  try {
    const users = await userService.list();
    sendSuccess(res, users);
  } catch (error) {
    next(error);
  }
};

// GET /users/:id - Get one
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};

// POST /users - Create
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    sendCreated(res, user, 'User created successfully');
  } catch (error) {
    next(error);
  }
};

// PUT /users/:id - Update
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    sendSuccess(res, user, 200, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

// DELETE /users/:id - Delete
export const deleteUser = async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    sendNoContent(res);
  } catch (error) {
    next(error);
  }
};
```

### Paginated List

```typescript
import { sendPaginated } from '../utils/response';

export const listUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await userService.list({
      page: Number(page),
      limit: Number(limit)
    });

    sendPaginated(res, result.users, {
      page: result.page,
      limit: result.limit,
      total: result.total
    });
  } catch (error) {
    next(error);
  }
};
```

## Response Type Definitions

### TypeScript Types

```typescript
// types/response.types.ts

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
  message?: string;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}

export interface PaginatedResponse<T = any> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}
```

## Best Practices

### 1. Consistent Response Structure

```typescript
// ✅ Good: Consistent structure
{
  "success": true,
  "data": { ... }
}

{
  "success": false,
  "error": "Error message"
}

// ❌ Bad: Inconsistent structure
{
  "user": { ... }
}

{
  "message": "Error occurred"
}
```

### 2. Use Appropriate Status Codes

```typescript
// ✅ Good: Correct status codes
res.status(201).json({ success: true, data: newUser }); // Created
res.status(404).json({ success: false, error: 'Not found' }); // Not found

// ❌ Bad: Wrong status codes
res.status(200).json({ success: true, data: newUser }); // Should be 201
res.status(200).json({ success: false, error: 'Not found' }); // Should be 404
```

### 3. Include Helpful Error Details

```typescript
// ✅ Good: Detailed validation errors
{
  "success": false,
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Too short" }
  ]
}

// ❌ Bad: Generic error
{
  "success": false,
  "error": "Invalid input"
}
```

### 4. Don't Expose Sensitive Information

```typescript
// ✅ Good: Safe error message
{
  "success": false,
  "error": "Authentication failed"
}

// ❌ Bad: Exposes internal details
{
  "success": false,
  "error": "User with email john@example.com not found in database users_collection"
}
```

### 5. Use Pagination for Lists

```typescript
// ✅ Good: Paginated response
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// ❌ Bad: Returning all records
{
  "success": true,
  "data": [/* 10000 records */]
}
```

## Common Response Patterns

### Search Results

```typescript
{
  "success": true,
  "data": [
    { "id": "1", "name": "Result 1" },
    { "id": "2", "name": "Result 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  },
  "filters": {
    "search": "query",
    "category": "tech"
  }
}
```

### Bulk Operations

```typescript
{
  "success": true,
  "data": {
    "processed": 100,
    "successful": 95,
    "failed": 5,
    "errors": [
      { "id": "1", "error": "Duplicate entry" },
      { "id": "5", "error": "Invalid data" }
    ]
  }
}
```

### File Upload

```typescript
{
  "success": true,
  "data": {
    "filename": "document.pdf",
    "url": "https://cdn.example.com/files/document.pdf",
    "size": 1024000,
    "mimetype": "application/pdf"
  }
}
```

### Authentication

```typescript
// Login success
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

// Login failure
{
  "success": false,
  "error": "Invalid credentials"
}
```

## Response Middleware

### Add Response Helpers to Express

```typescript
// middleware/response.middleware.ts
import { Response } from 'express';

declare global {
  namespace Express {
    interface Response {
      sendSuccess<T>(data: T, statusCode?: number, message?: string): void;
      sendError(error: string, statusCode?: number, details?: any): void;
      sendPaginated<T>(data: T[], pagination: PaginationParams): void;
    }
  }
}

export const responseMiddleware = (req, res, next) => {
  res.sendSuccess = function<T>(data: T, statusCode = 200, message?: string) {
    this.status(statusCode).json({
      success: true,
      data,
      ...(message && { message })
    });
  };

  res.sendError = function(error: string, statusCode = 500, details?: any) {
    this.status(statusCode).json({
      success: false,
      error,
      ...(details && { details })
    });
  };

  res.sendPaginated = function<T>(data: T[], pagination: PaginationParams) {
    this.status(200).json({
      success: true,
      data,
      pagination: {
        ...pagination,
        totalPages: Math.ceil(pagination.total / pagination.limit)
      }
    });
  };

  next();
};

// Usage in app.ts
app.use(responseMiddleware);

// Usage in controllers
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.sendSuccess(user);
  } catch (error) {
    next(error);
  }
};
```
