import fs from "fs/promises";

export async function createFolder(folderPath: string) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(
      `Directory '${folderPath}' created successfully (or already exists)!`
    );
  } catch (error) {
    console.error("Error creating directory.");
  }
}
