import { RequestHandler } from 'express';

export const requestIntercepter: RequestHandler = (req, res, next) => {
  console.log(
    `Request received: ${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`
  );
  next();
};
