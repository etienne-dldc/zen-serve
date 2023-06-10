import { HttpError, Middleware } from '../core';
import { LoggerConsumer } from '../logger';
import { zenjson } from './zenjson';

export function HttpErrorToZenjsonResponse(): Middleware {
  return async (ctx, next) => {
    const logger = ctx.get(LoggerConsumer);
    try {
      return await next(ctx);
    } catch (error) {
      const httpError = HttpError.match(error);
      if (httpError) {
        logger.error(error);
        return zenjson(httpError, { status: httpError.code });
      }
      throw error;
    }
  };
}
