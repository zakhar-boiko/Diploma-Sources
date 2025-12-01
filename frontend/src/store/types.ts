import { PayloadAction } from "@reduxjs/toolkit";

export interface ActionsProfileInfoState {
  uploadAvatarOpen?: boolean;
  uploadCVOpen?: boolean;
  aboutOpen?: boolean;
  experienceOpen?: boolean;
  skillsOpen?: boolean;
  languagesOpen?: boolean;
  companyInfoOpen?: boolean;
  profileLevelOpen?: boolean;
}

export type DrawerProps = {
  isOpen: boolean;
};

export interface DrawerState {
  isOpen: boolean;
}

export interface UploadAvatarModalPropsState extends DrawerState {
  file?: File;
}
export type ToggleDrawerProps = PayloadAction<DrawerState>;
export type ActionsProfileInfoParams = PayloadAction<ActionsProfileInfoState>;
export type SetFileType = PayloadAction<File | undefined>;
