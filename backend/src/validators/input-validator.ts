import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

export default (
  bodySchema: ZodObject<any> | null,
  paramsSchema?: ZodObject<any> | null,
  querySchema?: ZodObject<any> | null
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (bodySchema) await bodySchema.parseAsync(req.body);
      if (paramsSchema) await paramsSchema.parseAsync(req.params);
      if (querySchema) await querySchema.parseAsync(req.query);
      next();
    } catch (err) {
      let schemaError;
      if (err instanceof ZodError) {
        const errors: ZodError[] = JSON.parse(err as any);
        schemaError = errors.reduce((prev: any, curr: any) => {
          prev[curr.path[0]] = curr.message;
          return prev;
        }, {});
      }
      const errorResponse = Object.entries(schemaError).length
        ? schemaError
        : { message: "Invalid input." };
      res.status(400).json(errorResponse);
    }
  };
};
