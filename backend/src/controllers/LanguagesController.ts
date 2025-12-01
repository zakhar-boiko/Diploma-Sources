import { Request, Response } from "express-serve-static-core";
import { getAllLanguages } from "../repositories/LanguagesRepository";

const getAvailableLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await getAllLanguages();

    return res.status(200).send(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAvailableLanguages };
