export class BadRequestError extends Error {
  constructor(errors = []) {
    super("Validation Failed!");
    this.status = 400;
    this.errors = errors;
  }
}

export class NotFoundError extends Error {
  constructor(message = "Data is Not Found!") {
    super(message);
    this.status = 404;
    this.errors = [];
  }
}

export class InternalServerError extends Error {
  constructor(errors = []) {
    super("Internal Server Error");
    this.status = 500;
    this.errors = errors;
  }
}

export class Unauthorized extends Error {
  constructor(message = "Unauthorized!") {
    super(message);
    this.status = 401;
    this.errors = [];
  }
}

export class Forbidden extends Error {
  constructor(message = "Forbidden!") {
    super(message);
    this.status = 403;
    this.errors = [];
  }
}
