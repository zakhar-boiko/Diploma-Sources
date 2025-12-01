import { combineReducers } from "@reduxjs/toolkit";
import { actionsProfileInfoSlice } from "./ActionsProfileInfoState";
import { uploadAvatarModalSlice } from "./UploadAvatarDrawerState";
import { candidatesFiltersSlice } from "./CandidatesFiltersDrawerState";

export const mainReducer = combineReducers({
  actionsProfileInfo: actionsProfileInfoSlice.reducer,
  uploadAvatar: uploadAvatarModalSlice.reducer,
  filterCandidates: candidatesFiltersSlice.reducer
});
