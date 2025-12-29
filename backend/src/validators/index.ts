import z from "zod";

export const UUIDParamSchema = z.object({
  id: z.uuid("Invalid id param provided.")
});
