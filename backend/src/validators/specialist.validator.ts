import * as z from "zod";

export const SpecialistSchema = z.object({
  title: z.string("Title is required."),
  description: z.string("Description is required."),
  duration_days: z.number("Duration days is required.").min(1).max(100),
  base_price: z.number("Base price is required."),
  services_offerings: z
    .array(
      z.object({
        id: z.uuid("Offer id is required."),
        title: "Offer title is required."
      })
    )
    .optional()
});

export const GetAllSpecialistsQueryParamsSchema = z.object({
  page_number: z.string("Invalid page number query param provided.").optional(),
  page_size: z.string("Invalid page size query param provided.").optional(),
  limit: z.string("Invalid limit query param provided.").optional(),
  filter: z.enum(["all", "draft", "published"]).optional(),
  search: z.string("Invalid search query param provided.").optional()
});

export const UploadSpecialistMediaQueryParamsSchema = z.object({
  display_order: z.string("Display order is required.")
});
