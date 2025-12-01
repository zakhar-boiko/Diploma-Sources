import express from "express";
import {
  addExperience,
  askAi,
  deleteExperience,
  getAllUsers,
  getCreatedGigs,
  getFilteredCandidates,
  getMyProfile,
  getUserById,
  getUserMatches,
  updateExperience,
  updatePersonalDetails,
  updateProfile,
  updateProfileLanguages,
  updateProfileSkills,
  uploadAvatar,
  uploadCv,
} from "../controllers/UserController";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/me", getMyProfile);

userRouter.get("/candidates", getFilteredCandidates);

userRouter.get("/me/matches", getUserMatches);

userRouter.patch("/me/personal-details", updatePersonalDetails);

userRouter.patch("/me", updateProfile);

userRouter.put("/me/skills", updateProfileSkills);

userRouter.put("/me/languages", updateProfileLanguages);

userRouter.get("/me/gigs", getCreatedGigs);

userRouter.post("/me/experiences", addExperience);

userRouter.post("/me/avatar", upload.single("file"), uploadAvatar);

userRouter.post("/me/cv", upload.single("file"), uploadCv);

userRouter.post("/me/experiences", updateExperience);

userRouter.delete("/me/experiences/:id", deleteExperience);

userRouter.get("/:id", getUserById);

userRouter.post("/me/ai", askAi);


export default userRouter;
