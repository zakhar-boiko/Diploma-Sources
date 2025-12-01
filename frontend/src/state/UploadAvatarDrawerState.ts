import { createSlice } from "@reduxjs/toolkit";
import {
  SetFileType,
  ToggleDrawerProps,
  UploadAvatarModalPropsState,
} from "../store/types";

const initialState: UploadAvatarModalPropsState = {
  isOpen: false,
  file: undefined,
};

export const uploadAvatarModalSlice = createSlice({
  name: "UploadAvatar",
  initialState,
  reducers: {
    toggleDrawer: (state, action: ToggleDrawerProps) => {
      return { ...state, ...action.payload };
    },
    setFile: (state, action: SetFileType) => {
      state.file = action.payload;
    },
    resetState: () => initialState,
  },
});
