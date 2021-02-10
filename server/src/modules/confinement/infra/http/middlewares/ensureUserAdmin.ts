import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default function ensureUserAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (request.user.admin) {
    next();
  } else {
    throw new AppError('Not authorized for non-admin users', 401);
  }
}
