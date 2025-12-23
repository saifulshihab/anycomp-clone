import * as z from "zod";

export const SpecialistSchema = z.object({
  title: z.string("Title is required."),
  description: z.string("Description is required.")
});

export const SpecialistIdParamSchema = z.object({
  id: z.uuid("Invalid specialist id param provided.")
});

export const GetAllSpecialistsQueryParamsSchema = z.object({
  page_number: z.string("Invalid page number query param provided.").optional(),
  page_size: z.string("Invalid page size query param provided.").optional(),
  limit: z.string("Invalid limit query param provided.").optional(),
  filter: z.enum(["all", "draft", "published"]).optional(),
  search: z.string("Invalid search query param provided.").optional()
});
