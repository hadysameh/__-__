import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  officerName: any;
  officerRank: any;
  officerId: any;
  userType: any;
  token: any;
}
const initialState: userState = {
  officerName: null,
  officerRank: null,
  officerId: null,
  userType: null,
  token: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAuthData: (state: userState, action) => {
      const data = action.payload;
      state.officerName = data.officerName;
      state.officerRank = data.officerRank;
      state.officerId = data.officerId;
      state.userType = data.userType;
      state.token = data.token;
    },
    removeAuthData: (state: userState) => {
      state.officerName = null;
      state.officerRank = null;
      state.userType = null;
      state.token = null;
      // state.rank = null;
    },
  },
});

export const { setAuthData, removeAuthData } = userSlice.actions;
// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectOfficerName = (state: any) => state.userSlice.officerName;

export const selectToken = (state: any) => state.userSlice.token;

export const selectUserType = (state: any) => state.userSlice.userType;

export const selectOfficerRank = (state: any) => state.userSlice.officerRank;

export const selectOfficerId = (state: any) => state.userSlice.officerId;

export const getUserType = () => (dispatch: any, getState: any) => {
  return getState().userSlice.userType;
};

export default userSlice.reducer;
