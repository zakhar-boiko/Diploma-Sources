import { createSlice } from "@reduxjs/toolkit";
import {
  ActionsProfileInfoParams,
  ActionsProfileInfoState,
} from "../store/types";

const initialState: ActionsProfileInfoState = {
  uploadAvatarOpen: false,
  uploadCVOpen: false,
  aboutOpen: false,
  experienceOpen: false,
  skillsOpen: false,
  languagesOpen: false,
  profileLevelOpen: false,
  companyInfoOpen: false,
};

export const actionsProfileInfoSlice = createSlice({
  name: "ActionsProfileInfoState",
  initialState,
  reducers: {
    toggleModal: (state, action: ActionsProfileInfoParams) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
  },
});
