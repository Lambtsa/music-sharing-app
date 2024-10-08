export enum CustomApiErrorMessages {
  NoAccessToken = 'No access token',
  IncorrectInput = 'Input data is incorrect or incomplete',
  ExternalApiIssue = 'Issue with the Spotify API',
  NoTrack = 'No track available',
  IncorrectMethod = 'Only POST method is available',
  UnsupportedUrl = 'Unfortunately Youtube is unsupported currently',
}

export class CustomBaseError extends Error {
  statusCode = 500;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomBaseError.prototype);
  }
}

export class BadGatewayError extends CustomBaseError {
  statusCode = 502;
  message = CustomApiErrorMessages.NoAccessToken;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}

export class BadRequestError extends CustomBaseError {
  statusCode = 400;
  message = CustomApiErrorMessages.IncorrectInput;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnsupportedUrlError extends CustomBaseError {
  statusCode = 400;
  message = CustomApiErrorMessages.UnsupportedUrl;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, UnsupportedUrlError.prototype);
  }
}

export class ExternalApiError extends CustomBaseError {
  statusCode = 500;
  message = CustomApiErrorMessages.ExternalApiIssue;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ExternalApiError.prototype);
  }
}

export class NotFoundError extends CustomBaseError {
  statusCode = 404;
  message = CustomApiErrorMessages.NoTrack;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class MethodNotAllowedError extends CustomBaseError {
  statusCode = 405;
  message = CustomApiErrorMessages.IncorrectMethod;

  constructor(message?: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
  }
}
