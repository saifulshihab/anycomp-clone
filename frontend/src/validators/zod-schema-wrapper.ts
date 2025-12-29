import { ZodError, ZodObject } from "zod";

export const zodSchemaWrapper = (schema: ZodObject<any>) => {
  return async <T>(
    data: T
  ): Promise<{
    isValid: boolean;
    errors: { [key in Extract<keyof T, string>]?: string } | null;
  }> => {
    try {
      await schema.parseAsync(data);
      return {
        isValid: true,
        errors: null
      };
    } catch (err: any) {
      let schemaError;
      if (err instanceof ZodError) {
        const errors: ZodError[] = JSON.parse(err as any);
        schemaError = errors.reduce((prev: any, curr: any) => {
          prev[curr.path[0]] = curr.message;
          return prev;
        }, {});
      }

      return {
        isValid: false,
        errors: schemaError
      };
    }
  };
};
