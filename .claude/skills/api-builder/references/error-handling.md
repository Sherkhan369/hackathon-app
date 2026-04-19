# Error Handling Patterns

Comprehensive error handling strategies for Express REST APIs.

## Custom Error Classes

### Base AppError Class

```typescript
// utils/errors.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
```

### Specific Error Classes

```typescript
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, true);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, true);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, true);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 409, true, details);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, details);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, false);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
```

## Error Handler Middleware

### Comprehensive Error Handler

```typescript
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Error as MongooseError } from 'mongoose';
import { AppError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
        code: issue.code
      }))
    });
  }

  // Mongoose validation errors
  if (err instanceof MongooseError.ValidationError) {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Mongoose duplicate key error
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
      details: { field, value: err.keyValue?.[field] }
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}`,
      details: { field: err.path, value: err.value }
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired'
    });
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      error: 'File upload error',
      details: err.message
    });
  }

  // Default error (500)
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
};
```

### Development vs Production Error Handler

```typescript
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Log error
  if (isDevelopment) {
    console.error('Error Stack:', err.stack);
  } else {
    console.error('Error:', {
      message: err.message,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  // Handle known errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details && { details: err.details }),
      ...(isDevelopment && { stack: err.stack })
    });
  }

  // Handle unknown errors
  res.status(500).json({
    success: false,
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};
```

## Async Error Handling

### Async Handler Wrapper

```typescript
import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError('User');
  }
  res.json({ success: true, data: user });
});
```

### Try-Catch Pattern

```typescript
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('User');
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

## Service Layer Error Handling

### Throwing Errors in Services

```typescript
// services/user.service.ts
import { NotFoundError, ConflictError } from '../utils/errors';

export const userService = {
  async create(data: CreateUserInput) {
    // Check for existing user
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    // Create user
    const user = await User.create(data);
    return user;
  },

  async getById(id: string) {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  },

  async update(id: string, data: UpdateUserInput) {
    const user = await User.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  },

  async delete(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }
};
```

### Handling Service Errors in Controllers

```typescript
// controllers/user.controller.ts
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
};
```

## Error Response Formats

### Standard Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
  stack?: string; // Only in development
}

// Example responses
{
  "success": false,
  "error": "User not found"
}

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

### HTTP Status Codes

```typescript
// Common status codes for REST APIs
export const HTTP_STATUS = {
  OK: 200,                    // Successful GET, PUT, PATCH
  CREATED: 201,               // Successful POST
  NO_CONTENT: 204,            // Successful DELETE
  BAD_REQUEST: 400,           // Invalid request data
  UNAUTHORIZED: 401,          // Authentication required
  FORBIDDEN: 403,             // Authenticated but not authorized
  NOT_FOUND: 404,             // Resource not found
  CONFLICT: 409,              // Duplicate resource
  UNPROCESSABLE_ENTITY: 422,  // Validation failed
  INTERNAL_SERVER_ERROR: 500, // Server error
  SERVICE_UNAVAILABLE: 503    // Service temporarily unavailable
} as const;
```

## Best Practices

### 1. Use Specific Error Classes

```typescript
// ❌ Bad: Generic errors
throw new Error('User not found');
throw new Error('Email already exists');

// ✅ Good: Specific error classes
throw new NotFoundError('User');
throw new ConflictError('Email already registered');
```

### 2. Always Pass Errors to next()

```typescript
// ❌ Bad: Swallowing errors
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Good: Pass to error handler
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
```

### 3. Distinguish Operational vs Programming Errors

```typescript
// Operational errors (expected, handle gracefully)
throw new NotFoundError('User');
throw new ValidationError('Invalid email');

// Programming errors (bugs, should crash in development)
if (!config.jwtSecret) {
  throw new Error('JWT_SECRET is not defined'); // Should crash
}
```

### 4. Log Errors Appropriately

```typescript
export const errorHandler = (err, req, res, next) => {
  // Always log errors
  if (err instanceof AppError && err.isOperational) {
    // Operational error - log as warning
    console.warn('Operational error:', err.message);
  } else {
    // Programming error - log as error with stack
    console.error('Programming error:', err.stack);
  }

  // Send response
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message
  });
};
```

### 5. Don't Expose Sensitive Information

```typescript
// ❌ Bad: Exposing internal details
res.status(500).json({
  error: err.message,
  stack: err.stack,
  query: req.query,
  body: req.body
});

// ✅ Good: Generic message in production
res.status(500).json({
  error: process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message
});
```

## Common Patterns

### Not Found Handler

```typescript
// Place before error handler, after all routes
app.use((req, res, next) => {
  throw new NotFoundError('Route');
});

app.use(errorHandler);
```

### Validation Error Handler

```typescript
export const handleValidationError = (error: any) => {
  if (error instanceof ZodError) {
    throw new ValidationError(
      'Validation failed',
      error.issues.map(i => ({
        field: i.path.join('.'),
        message: i.message
      }))
    );
  }

  if (error instanceof MongooseError.ValidationError) {
    throw new ValidationError(
      'Validation failed',
      Object.values(error.errors).map(e => ({
        field: e.path,
        message: e.message
      }))
    );
  }

  throw error;
};
```

### Database Error Handler

```typescript
export const handleDatabaseError = (error: any) => {
  // Duplicate key
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    throw new ConflictError(`${field} already exists`);
  }

  // Cast error
  if (error instanceof MongooseError.CastError) {
    throw new BadRequestError(`Invalid ${error.path}`);
  }

  throw error;
};
```

## Testing Error Handling

### Unit Test Example

```typescript
import { NotFoundError } from '../utils/errors';
import { userService } from '../services/user.service';

describe('User Service', () => {
  it('should throw NotFoundError when user does not exist', async () => {
    await expect(userService.getById('invalid-id'))
      .rejects
      .toThrow(NotFoundError);
  });

  it('should throw ConflictError when email exists', async () => {
    await User.create({ email: 'test@example.com', name: 'Test' });

    await expect(userService.create({
      email: 'test@example.com',
      name: 'Test 2'
    }))
      .rejects
      .toThrow(ConflictError);
  });
});
```

### Integration Test Example

```typescript
import request from 'supertest';
import app from '../app';

describe('GET /api/users/:id', () => {
  it('should return 404 when user not found', async () => {
    const response = await request(app)
      .get('/api/users/invalid-id')
      .expect(404);

    expect(response.body).toEqual({
      success: false,
      error: 'User not found'
    });
  });

  it('should return 400 for invalid ObjectId', async () => {
    const response = await request(app)
      .get('/api/users/not-an-objectid')
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});
```
