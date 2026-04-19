# Zod Validation Patterns

Domain expertise for Zod schema validation with TypeScript and Express integration.

## Basic Schema Definition

### Simple Object Schema

```typescript
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
  role: z.enum(['admin', 'user', 'guest']).default('user')
});

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>;
// { name: string; email: string; age?: number; role: "admin" | "user" | "guest" }

// Parse and validate
const validUser = userSchema.parse({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  role: 'admin'
});
```

### Safe Parsing (No Exceptions)

```typescript
const result = userSchema.safeParse({
  name: 'John',
  email: 'invalid-email'
});

if (!result.success) {
  console.log(result.error.issues);
  // [
  //   {
  //     code: 'invalid_string',
  //     validation: 'email',
  //     path: ['email'],
  //     message: 'Invalid email'
  //   }
  // ]
} else {
  console.log(result.data); // Typed User object
}
```

## Express Integration

### Request Validation Middleware

```typescript
import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        });
      }
      next(error);
    }
  };
};
```

### Complete Request Schema

```typescript
// Define schemas for body, query, and params
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    role: z.enum(['admin', 'user']).optional()
  }),
  query: z.object({
    sendEmail: z.string().transform(val => val === 'true').optional()
  }),
  params: z.object({})
});

// Infer types
type CreateUserBody = z.infer<typeof createUserSchema>['body'];
type CreateUserQuery = z.infer<typeof createUserSchema>['query'];

// Use in route
router.post(
  '/users',
  validateRequest(createUserSchema),
  createUserController
);
```

## Advanced Schema Patterns

### Nested Objects

```typescript
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/),
  country: z.string()
});

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: addressSchema,
  billingAddress: addressSchema.optional()
});
```

### Arrays

```typescript
const postSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()).min(1).max(10),
  authors: z.array(z.object({
    name: z.string(),
    email: z.string().email()
  })).nonempty()
});
```

### Unions and Discriminated Unions

```typescript
// Simple union
const idSchema = z.union([
  z.string().uuid(),
  z.number().int().positive()
]);

// Discriminated union (better type inference)
const notificationSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('email'),
    email: z.string().email(),
    subject: z.string()
  }),
  z.object({
    type: z.literal('sms'),
    phoneNumber: z.string(),
    message: z.string()
  }),
  z.object({
    type: z.literal('push'),
    deviceId: z.string(),
    title: z.string()
  })
]);
```

### Refinements (Custom Validation)

```typescript
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .refine(
    (val) => /[A-Z]/.test(val),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (val) => /[a-z]/.test(val),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (val) => /[0-9]/.test(val),
    'Password must contain at least one number'
  );

const userSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  }
);
```

### Transformations

```typescript
const querySchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().positive()),
  limit: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1).max(100)),
  sort: z.string().optional(),
  search: z.string().trim().optional()
});

// Input: { page: "2", limit: "20", search: "  hello  " }
// Output: { page: 2, limit: 20, search: "hello" }
```

## Error Handling

### Catching ZodError

```typescript
try {
  const user = userSchema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
    // [
    //   {
    //     code: 'invalid_type',
    //     expected: 'string',
    //     received: 'number',
    //     path: ['name'],
    //     message: 'Expected string, received number'
    //   }
    // ]
  }
}
```

### Custom Error Messages

```typescript
const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }).min(1, 'Name cannot be empty'),

  email: z.string()
    .email('Please provide a valid email address'),

  age: z.number()
    .int('Age must be an integer')
    .min(0, 'Age cannot be negative')
    .max(150, 'Age must be less than 150')
});
```

### Formatting Error Messages

```typescript
export const formatZodError = (error: z.ZodError) => {
  return error.issues.map(issue => ({
    field: issue.path.join('.'),
    message: issue.message,
    code: issue.code
  }));
};

// Usage in middleware
if (error instanceof z.ZodError) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    details: formatZodError(error)
  });
}
```

## Common Validation Patterns

### Email Validation

```typescript
const emailSchema = z.string()
  .email('Invalid email format')
  .toLowerCase()
  .trim();
```

### URL Validation

```typescript
const urlSchema = z.string()
  .url('Invalid URL format')
  .startsWith('https://', 'URL must use HTTPS');
```

### Date Validation

```typescript
const dateSchema = z.string()
  .datetime('Invalid datetime format')
  .or(z.date());

const dateRangeSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date()
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
);
```

### MongoDB ObjectId Validation

```typescript
import mongoose from 'mongoose';

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  'Invalid ObjectId format'
);

// Or with transformation
const objectIdTransformSchema = z.string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val))
  .transform((val) => new mongoose.Types.ObjectId(val));
```

### File Upload Validation

```typescript
const fileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.enum(['image/jpeg', 'image/png', 'image/gif']),
  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB')
});
```

### Pagination Schema

```typescript
const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc')
});
```

## Reusable Schemas

### Base Schemas

```typescript
// Common field schemas
export const schemas = {
  id: z.string().uuid(),
  mongoId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val)),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(100),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  url: z.string().url(),
  timestamp: z.coerce.date(),

  // Pagination
  pagination: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10)
  })
};

// Usage
const userSchema = z.object({
  id: schemas.mongoId,
  email: schemas.email,
  password: schemas.password
});
```

### Schema Composition

```typescript
// Base entity schema
const baseEntitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Extend base schema
const userSchema = baseEntitySchema.extend({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user'])
});

// Pick specific fields
const userPublicSchema = userSchema.pick({
  id: true,
  name: true,
  email: true
});

// Omit fields
const userWithoutTimestamps = userSchema.omit({
  createdAt: true,
  updatedAt: true
});

// Partial (all fields optional)
const userUpdateSchema = userSchema.partial();

// Deep partial
const userDeepPartialSchema = userSchema.deepPartial();
```

## Best Practices

### 1. Define Schemas Close to Usage

```typescript
// ✅ Good: Schema in validator file
// validators/user.validator.ts
export const createUserSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email()
  })
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
```

### 2. Use Type Inference

```typescript
// ❌ Bad: Duplicate type definition
interface User {
  name: string;
  email: string;
}
const userSchema = z.object({
  name: z.string(),
  email: z.string()
});

// ✅ Good: Infer type from schema
const userSchema = z.object({
  name: z.string(),
  email: z.string()
});
type User = z.infer<typeof userSchema>;
```

### 3. Validate Early

```typescript
// ✅ Validate at API boundary
router.post('/users', validateRequest(createUserSchema), createUser);

// Not in service layer or database layer
```

### 4. Use safeParse for User Input

```typescript
// ✅ Good: Use safeParse for external input
const result = userSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: result.error });
}

// ❌ Bad: parse() throws, harder to handle
const user = userSchema.parse(req.body);
```

### 5. Provide Clear Error Messages

```typescript
// ✅ Good: Custom messages
const schema = z.object({
  email: z.string().email('Please provide a valid email address'),
  age: z.number().min(18, 'You must be at least 18 years old')
});

// ❌ Bad: Default messages
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});
```

## Common Pitfalls

### 1. Not Using Coercion for Query Params

```typescript
// ❌ Wrong: Query params are always strings
const schema = z.object({
  query: z.object({
    page: z.number() // Will fail!
  })
});

// ✅ Correct: Use coercion
const schema = z.object({
  query: z.object({
    page: z.coerce.number()
  })
});
```

### 2. Forgetting to Handle ZodError

```typescript
// ❌ Wrong: Generic error handling
try {
  schema.parse(data);
} catch (error) {
  res.status(500).json({ error: 'Something went wrong' });
}

// ✅ Correct: Check for ZodError
try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: error.issues });
  }
  res.status(500).json({ error: 'Internal error' });
}
```

### 3. Not Using Async Validation

```typescript
// ❌ Wrong: Async refinement without parseAsync
const schema = z.object({
  email: z.string().email()
}).refine(async (data) => {
  const exists = await User.findOne({ email: data.email });
  return !exists;
});

schema.parse(data); // Won't work!

// ✅ Correct: Use parseAsync
await schema.parseAsync(data);
```
