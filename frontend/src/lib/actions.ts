"use server";

import { revalidatePath } from "next/cache";

export const revalidateHomePage = async () => {
  revalidatePath("/");
};
