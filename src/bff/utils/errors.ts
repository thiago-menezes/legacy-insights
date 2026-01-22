export class BffError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'BffError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class BffValidationError extends BffError {
  constructor(message: string, details?: unknown) {
    super(message, 400, details);
    this.name = 'BffValidationError';
  }
}

export class BffNotFoundError extends BffError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'BffNotFoundError';
  }
}

export class BffUnauthorizedError extends BffError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'BffUnauthorizedError';
  }
}

export class BffTimeoutError extends BffError {
  constructor(message = 'Request timed out') {
    super(message, 504);
    this.name = 'BffTimeoutError';
  }
}
