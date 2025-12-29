import * as z from "zod";
import { zodSchemaWrapper } from "./zod-schema-wrapper";

export const specialistValidator = zodSchemaWrapper(
  z.object({
    title: z.string("Title is required."),
    description: z.string("Description is required."),
    duration_days: z.number("Duration days is required.").min(1).max(100),
    base_price: z.number("Base price is required.")
  })
);
