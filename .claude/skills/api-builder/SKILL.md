---
name: api-builder
description: |
  Generate production-ready REST APIs with Express, TypeScript, Mongoose, and Zod.
  Creates router, controller, service layer, validation schemas, error handling, and standardized responses.
  This skill should be used when users ask to create API endpoints, build REST APIs, implement backend routes, or generate API boilerplate.
---

# API Builder

Generate production-ready REST APIs with Express.js, TypeScript, Mongoose, and Zod validation.

## What This Skill Does

- Creates complete API endpoints with router → controller → service architecture
- Generates Zod validation schemas for request/response
- Implements standardized error handling and response formats
- Integrates with Mongoose models and TypeScript types
- Follows Express.js and REST API best practices

## What This Skill Does NOT Do

- Create database schemas or Mongoose models (use separate model creation)
- Set up Express server configuration or middleware stack
- Implement authentication/authorization logic (use separate auth system)
- Generate API documentation (use OpenAPI/Swagger tools)

---

## Before Implementation

Gather context to ensure successful implementation:

| Source | Gather |
|--------|--------|
| **Codebase** | Existing API structure, naming conventions, file organization, error handling patterns |
| **Conversation** | Endpoint requirements, HTTP methods, request/response schemas, business logic |
| **Skill References** | Express patterns, Mongoose integration, Zod validation, error handling from `references/` |
| **User Guidelines** | Project-specific conventions, team standards, existing utilities |

Ensure all required context is gathered before implementing.
Only ask user for THEIR specific requirements (domain expertise is in this skill).

---

## API Generation Workflow

### 1. Clarify Requirements

Ask user to specify:

| Requirement | Example |
|-------------|---------|
| **Resource name** | `users`, `products`, `appointments` |
| **HTTP methods** | GET, POST, PUT, PATCH, DELETE |
| **Request schema** | Body fields, query params, path params |
| **Response schema** | Success response structure |
| **Business logic** | What the endpoint should do |
| **Mongoose model** | Existing model name or need to create |

### 2. Analyze Codebase Structure

Before generating, identify:

```
- [ ] Existing API directory structure (routes/, controllers/, services/)
- [ ] Naming conventions (camelCase, kebab-case, PascalCase)
- [ ] Error handling utilities (custom error classes, error middleware)
- [ ] Response formatting utilities (success/error response helpers)
- [ ] Validation middleware location (middlewares/, validators/)
- [ ] Mongoose model location (models/, schemas/)
```

### 3. Generate API Components

Create in this order:

**A. Validation Schema** (`validators/` or `schemas/`)
- Zod schema for request body, query params, path params
- Type inference for TypeScript
- Error message customization

**B. Service Layer** (`services/`)
- Business logic implementation
- Mongoose model interactions
- Transaction handling if needed
- Error throwing with proper error classes

**C. Controller** (`controllers/`)
- Request/response handling
- Validation using Zod schemas
- Service layer calls
- Response formatting

**D. Router** (`routes/`)
- Express Router setup
- Route definitions with HTTP methods
- Validation middleware integration
- Controller method binding

### 4. Integration Checklist

After generation, verify:

```
- [ ] Router exported and ready to mount in main app
- [ ] All imports resolve correctly
- [ ] TypeScript types inferred from Zod schemas
- [ ] Error handling follows project patterns
- [ ] Response format matches project standards
- [ ] Mongoose model methods used correctly
- [ ] Async/await error handling implemented
- [ ] HTTP status codes appropriate
```

---

## Component Templates

### Router Structure

```typescript
import { Router } from 'express';
import { controllerMethod } from '../controllers/resource.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { resourceSchema } from '../validators/resource.validator';

const router = Router();

router.post('/', validateRequest(resourceSchema), controllerMethod);

export default router;
```

### Controller Structure

```typescript
import { Request, Response, NextFunction } from 'express';
import { resourceService } from '../services/resource.service';
import { ResourceInput } from '../validators/resource.validator';

export const createResource = async (
  req: Request<{}, {}, ResourceInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await resourceService.create(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};
```

### Service Structure

```typescript
import { ResourceModel } from '../models/resource.model';
import { ResourceInput } from '../validators/resource.validator';
import { AppError } from '../utils/errors';

export const resourceService = {
  async create(data: ResourceInput) {
    const existing = await ResourceModel.findOne({ field: data.field });
    if (existing) {
      throw new AppError('Resource already exists', 409);
    }

    const resource = await ResourceModel.create(data);
    return resource;
  }
};
```

### Validation Schema Structure

```typescript
import { z } from 'zod';

export const resourceSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    age: z.number().int().min(0).optional()
  })
});

export type ResourceInput = z.infer<typeof resourceSchema>['body'];
```

---

## Error Handling Patterns

### Custom Error Class

```typescript
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
```

### Error Middleware

```typescript
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.message
    });
  }

  // Zod validation error
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.issues
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

---

## Response Standardization

### Success Response Format

```typescript
{
  success: true,
  data: { /* resource data */ },
  message?: "Optional success message"
}
```

### Error Response Format

```typescript
{
  success: false,
  error: "Error message",
  details?: { /* additional error details */ }
}
```

### Pagination Response Format

```typescript
{
  success: true,
  data: [ /* array of resources */ ],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10
  }
}
```

---

## Best Practices

### Async Error Handling

Always wrap async route handlers:

```typescript
// Option 1: try-catch in controller
export const handler = async (req, res, next) => {
  try {
    // logic
  } catch (error) {
    next(error);
  }
};

// Option 2: async wrapper utility
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const handler = asyncHandler(async (req, res) => {
  // logic
});
```

### Validation Middleware

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
      next(error);
    }
  };
};
```

### Service Layer Separation

- Controllers: Handle HTTP (req/res)
- Services: Handle business logic
- Models: Handle data access

```typescript
// ❌ Bad: Business logic in controller
export const createUser = async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) throw new Error('User exists');
  const user = await User.create(req.body);
  res.json(user);
};

// ✅ Good: Business logic in service
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

---

## Reference Files

| File | Purpose |
|------|---------|
| `references/express-patterns.md` | Express routing, middleware, error handling |
| `references/mongoose-patterns.md` | Mongoose models, queries, transactions |
| `references/zod-patterns.md` | Zod validation schemas and error handling |
| `references/response-standards.md` | Response format conventions |
| `references/error-handling.md` | Error classes and middleware patterns |

---

## Common API Patterns

### CRUD Operations

```typescript
// GET /resources - List all
router.get('/', listResources);

// GET /resources/:id - Get one
router.get('/:id', getResource);

// POST /resources - Create
router.post('/', validateRequest(createSchema), createResource);

// PUT /resources/:id - Full update
router.put('/:id', validateRequest(updateSchema), updateResource);

// PATCH /resources/:id - Partial update
router.patch('/:id', validateRequest(patchSchema), patchResource);

// DELETE /resources/:id - Delete
router.delete('/:id', deleteResource);
```

### Query Parameters

```typescript
// GET /resources?page=1&limit=10&sort=-createdAt&filter[status]=active

export const listResources = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;

    const resources = await resourceService.list({
      page: Number(page),
      limit: Number(limit),
      sort,
      filter
    });

    res.json({
      success: true,
      data: resources.items,
      pagination: resources.pagination
    });
  } catch (error) {
    next(error);
  }
};
```

---

## Output Checklist

After generating API, verify:

```
- [ ] All files created in correct directories
- [ ] Imports resolve without errors
- [ ] TypeScript types properly inferred
- [ ] Zod schemas validate correctly
- [ ] Error handling implemented
- [ ] Response format standardized
- [ ] HTTP status codes appropriate
- [ ] Mongoose model integration correct
- [ ] Router ready to mount in app
- [ ] No hardcoded values or secrets
```
