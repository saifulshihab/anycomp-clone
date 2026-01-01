import fs from "fs";
import path from "path";
import { AppDataSource } from "../config/data-source";
import { Specialist } from "../entity/specialist.entity";

// Create specialist's unique slug based on title
export const createSpecialistUniqueSlug = async (title: string) => {
  let slug = title.toLowerCase().replace(/\s/g, "-");

  const SpecialistRepository = AppDataSource.getRepository(Specialist);
  const slugExist = await SpecialistRepository.findOne({ where: { slug } });

  if (slugExist) {
    // Slug exist, add additional character
    slug = `${slug}-${Math.floor(Math.random() * 10)}`;
    await createSpecialistUniqueSlug(slug);
  }

  return slug;
};

// Delete image files from disk storage while deleting specialist media
export const deleteFileFromDisk = (fileNames: string[]) => {
  try {
    if (!fileNames.length) return;
    for (const pathName of fileNames) {
      const filePath = path.join("./" + `/uploads/${pathName}`);
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  } catch (err) {
    console.error("Failed to delete image file!", err);
  }
};
