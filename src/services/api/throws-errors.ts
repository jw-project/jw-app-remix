export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
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
