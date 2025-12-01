import { bucket } from "../config/firebaseConfig";

interface FileUploadOptions {
  folder: string;
  onUpload: (downloadURL: string[]) => void;
}

async function uploadFile(
  file: Express.Multer.File,
  options: FileUploadOptions
): Promise<void> {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }
    const fileUpload = bucket.file(`${options.folder}/${file.originalname}`);

    const writeStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    writeStream.on("error", (error: any) => {
      throw new Error("An error occurred while uploading the file");
    });

    writeStream.on("finish", () => {
      fileUpload
        .getSignedUrl({ action: "read", expires: "01-01-2100" })
        .then((downloadURL: string[]) => {
          options.onUpload(downloadURL);
        })
        .catch((error: Error) => {
          throw new Error(
            "An error occurred while retrieving the download URL"
          );
        });
    });

    writeStream.end(file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export { uploadFile };
