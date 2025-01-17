import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";

import { EUserRole, TTokenizedUser } from "../rtk-apis/auth/auth.types";

interface IAuthenticatedUser {
  userId: number | null;
  email: string | null;
  role: EUserRole | null;
  roleId: number | null;
}

const initialState: IAuthenticatedUser = {
  userId: 1,
  email: null,
  role: null,
  roleId: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TTokenizedUser>) => {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.role = action.payload.role as EUserRole;
      state.roleId = action.payload.roleId;
    },

    clearUser: (state) => {
      state.email = null;
      state.userId = null;
      state.role = null;
      state.roleId = null;      
    },
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;

export const selectUserId = (state: TRootState) => state.authenticatedUser.userId;

export default authenticatedUserSlice.reducer;
