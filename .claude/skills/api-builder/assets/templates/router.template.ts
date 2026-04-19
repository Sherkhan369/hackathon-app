import { Router } from 'express';
import { {{controllerName}} } from '../controllers/{{resourceName}}.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { {{schemaName}} } from '../validators/{{resourceName}}.validator';

const router = Router();

// GET /{{resourceName}} - List all
router.get('/', {{controllerName}}.list);

// GET /{{resourceName}}/:id - Get one
router.get('/:id', {{controllerName}}.getById);

// POST /{{resourceName}} - Create
router.post('/', validateRequest({{schemaName}}.create), {{controllerName}}.create);

// PUT /{{resourceName}}/:id - Full update
router.put('/:id', validateRequest({{schemaName}}.update), {{controllerName}}.update);

// PATCH /{{resourceName}}/:id - Partial update
router.patch('/:id', validateRequest({{schemaName}}.patch), {{controllerName}}.patch);

// DELETE /{{resourceName}}/:id - Delete
router.delete('/:id', {{controllerName}}.delete);

export default router;
