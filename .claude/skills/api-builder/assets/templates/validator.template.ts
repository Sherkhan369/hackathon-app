import { z } from 'zod';

// Base schema for {{resourceName}}
const {{resourceName}}BaseSchema = z.object({
  // Add your fields here
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  // Add more fields as needed
});

// Create schema (for POST requests)
export const create{{ResourceName}}Schema = z.object({
  body: {{resourceName}}BaseSchema
});

// Update schema (for PUT requests)
export const update{{ResourceName}}Schema = z.object({
  body: {{resourceName}}BaseSchema
});

// Patch schema (for PATCH requests - all fields optional)
export const patch{{ResourceName}}Schema = z.object({
  body: {{resourceName}}BaseSchema.partial()
});

// Query schema (for GET list requests)
export const list{{ResourceName}}Schema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sort: z.string().optional(),
    search: z.string().optional()
  })
});

// Params schema (for routes with :id)
export const {{resourceName}}ParamsSchema = z.object({
  params: z.object({
    id: z.string().refine(
      (val) => /^[0-9a-fA-F]{24}$/.test(val),
      'Invalid ObjectId format'
    )
  })
});

// Export schemas for validation middleware
export const {{resourceName}}Schemas = {
  create: create{{ResourceName}}Schema,
  update: update{{ResourceName}}Schema,
  patch: patch{{ResourceName}}Schema,
  list: list{{ResourceName}}Schema,
  params: {{resourceName}}ParamsSchema
};

// Export TypeScript types
export type Create{{ResourceName}}Input = z.infer<typeof create{{ResourceName}}Schema>['body'];
export type Update{{ResourceName}}Input = z.infer<typeof update{{ResourceName}}Schema>['body'];
export type Patch{{ResourceName}}Input = z.infer<typeof patch{{ResourceName}}Schema>['body'];
export type List{{ResourceName}}Query = z.infer<typeof list{{ResourceName}}Schema>['query'];
