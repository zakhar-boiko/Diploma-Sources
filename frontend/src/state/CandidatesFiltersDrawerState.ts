import { createSlice } from "@reduxjs/toolkit";
import { DrawerProps, ToggleDrawerProps } from "../store/types";

const initialState: DrawerProps = {
  isOpen: false,
};

export const candidatesFiltersSlice = createSlice({
  name: "FilterCandidates",
  initialState,
  reducers: {
    toggleDrawer: (state, action: ToggleDrawerProps) => {
      return { ...state, ...action.payload };
    },

    resetState: () => initialState,
  },
});
