import { Response } from 'express';

// Success response helpers
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

// Error response helpers
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
