# Express.js Patterns

Domain expertise for Express.js routing, middleware, and error handling.

## Router Patterns

### Modular Router Setup

```typescript
// routes/users.routes.ts
import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';

const router = Router();

// Router-specific middleware
router.use((req, res, next) => {
  console.log(`User route accessed: ${req.method} ${req.path}`);
  next();
});

// Route definitions
router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/', validateRequest(createUserSchema), userController.create);
router.put('/:id', validateRequest(updateUserSchema), userController.update);
router.delete('/:id', userController.delete);

export default router;
```

### Mounting Routers

```typescript
// app.ts
import express from 'express';
import userRoutes from './routes/users.routes';
import productRoutes from './routes/products.routes';

const app = express();

app.use(express.json());

// Mount routers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

export default app;
```

## Error Handling

### Error Handling Middleware

**CRITICAL**: Error handlers MUST have 4 parameters `(err, req, res, next)` for Express to recognize them.

```typescript
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

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
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.message
    });
  }

  // Mongoose duplicate key error
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: 'Duplicate key error',
      details: err.message
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

### Error Propagation

**Synchronous errors**: Automatically caught by Express

```typescript
app.get('/sync-error', (req, res) => {
  throw new Error('Something broke!'); // Express catches this
});
```

**Asynchronous errors**: Must pass to `next()`

```typescript
app.get('/async-error', async (req, res, next) => {
  try {
    await someAsyncOperation();
    res.json({ success: true });
  } catch (error) {
    next(error); // Pass to error handler
  }
});
```

### Async Handler Wrapper

Utility to avoid try-catch in every async route:

```typescript
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Usage
router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
}));
```

## Middleware Patterns

### Request Validation Middleware

```typescript
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      next(error); // Pass to error handler
    }
  };
};
```

### Authentication Middleware

```typescript
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
```

### Authorization Middleware

```typescript
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized', 403));
    }

    next();
  };
};

// Usage
router.delete('/:id', authenticate, authorize('admin'), deleteUser);
```

## Request/Response Patterns

### Type-Safe Request Handlers

```typescript
import { Request, Response, NextFunction } from 'express';

// Define request types
interface CreateUserRequest {
  body: {
    name: string;
    email: string;
  };
}

interface GetUserRequest {
  params: {
    id: string;
  };
}

// Type-safe handlers
export const createUser = async (
  req: Request<{}, {}, CreateUserRequest['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body; // Typed!
    const user = await userService.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request<GetUserRequest['params']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Typed!
    const user = await userService.getById(id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

### Response Helpers

```typescript
// utils/response.ts
import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  statusCode: number = 200,
  message?: string
) => {
  res.status(statusCode).json({
    success: true,
    data,
    ...(message && { message })
  });
};

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

// Usage
export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
};
```

## Best Practices

### 1. Middleware Order Matters

```typescript
const app = express();

// 1. Body parsers first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS, security middleware
app.use(cors());
app.use(helmet());

// 3. Logging
app.use(morgan('dev'));

// 4. Routes
app.use('/api/v1/users', userRoutes);

// 5. 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 6. Error handler (MUST be last)
app.use(errorHandler);
```

### 2. Route Parameter Validation

```typescript
// Validate MongoDB ObjectId
router.param('id', (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid ID format', 400));
  }
  next();
});
```

### 3. Router Composition

```typescript
// Nested routers
const userRouter = Router();
const postRouter = Router({ mergeParams: true }); // Access parent params

postRouter.get('/', getUserPosts);
postRouter.post('/', createUserPost);

userRouter.use('/:userId/posts', postRouter);

// Routes: GET /users/:userId/posts, POST /users/:userId/posts
```

### 4. Error Handler Placement

```typescript
// ❌ Wrong: Error handler before routes
app.use(errorHandler);
app.use('/api', routes);

// ✅ Correct: Error handler after all routes
app.use('/api', routes);
app.use(errorHandler);
```

## Common Pitfalls

### 1. Missing next() in Middleware

```typescript
// ❌ Wrong: Middleware doesn't call next()
app.use((req, res, next) => {
  console.log('Request received');
  // Forgot next() - request hangs!
});

// ✅ Correct
app.use((req, res, next) => {
  console.log('Request received');
  next();
});
```

### 2. Async Errors Not Caught

```typescript
// ❌ Wrong: Async error not passed to next()
app.get('/users', async (req, res) => {
  const users = await User.find(); // If this throws, Express won't catch it
  res.json(users);
});

// ✅ Correct: Use try-catch or asyncHandler
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
```

### 3. Wrong Error Handler Signature

```typescript
// ❌ Wrong: Only 3 parameters
app.use((err, req, res) => {
  res.status(500).json({ error: err.message });
});

// ✅ Correct: Must have 4 parameters
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```
