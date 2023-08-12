import { json } from '@remix-run/server-runtime';

export class HttpError extends Error {
  status: number;

  feedback = true;

  constructor(message: string, status: number, feedback = true) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    this.feedback = feedback;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'common.bad-request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'common.unauthorized-request') {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'common.forbidden-request') {
    super(message, 403);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'common.not-found-request') {
    super(message, 404);
  }
}

export function sendReturnMessage(error: unknown) {
  const { message, status, feedback } = error as HttpError;

  return json({ message, feedback }, { status: status || 400 });
}

export type InputError = {
  field: string;
  message: string;
};

export function throwInputError(inputError: InputError) {
  return json(inputError, 400);
}
