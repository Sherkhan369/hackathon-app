import { Request, Response, NextFunction } from 'express';
import { {{serviceName}} } from '../services/{{resourceName}}.service';
import { Create{{ResourceName}}Input, Update{{ResourceName}}Input } from '../validators/{{resourceName}}.validator';

export const {{controllerName}} = {
  // GET /{{resourceName}} - List all
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10, sort, filter } = req.query;

      const result = await {{serviceName}}.list({
        page: Number(page),
        limit: Number(limit),
        sort: sort as string,
        filter: filter as any
      });

      res.status(200).json({
        success: true,
        data: result.items,
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: Math.ceil(result.total / result.limit)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /{{resourceName}}/:id - Get one
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const {{resourceName}} = await {{serviceName}}.getById(req.params.id);

      res.status(200).json({
        success: true,
        data: {{resourceName}}
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /{{resourceName}} - Create
  async create(req: Request<{}, {}, Create{{ResourceName}}Input>, res: Response, next: NextFunction) {
    try {
      const {{resourceName}} = await {{serviceName}}.create(req.body);

      res.status(201).json({
        success: true,
        data: {{resourceName}},
        message: '{{ResourceName}} created successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // PUT /{{resourceName}}/:id - Full update
  async update(req: Request<{ id: string }, {}, Update{{ResourceName}}Input>, res: Response, next: NextFunction) {
    try {
      const {{resourceName}} = await {{serviceName}}.update(req.params.id, req.body);

      res.status(200).json({
        success: true,
        data: {{resourceName}},
        message: '{{ResourceName}} updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // PATCH /{{resourceName}}/:id - Partial update
  async patch(req: Request<{ id: string }, {}, Partial<Update{{ResourceName}}Input>>, res: Response, next: NextFunction) {
    try {
      const {{resourceName}} = await {{serviceName}}.update(req.params.id, req.body);

      res.status(200).json({
        success: true,
        data: {{resourceName}},
        message: '{{ResourceName}} updated successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE /{{resourceName}}/:id - Delete
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await {{serviceName}}.delete(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
