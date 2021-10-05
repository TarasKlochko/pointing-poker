import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const deleteInfoPopupSlice = createSlice({
  name: 'deleteInfoPopup',
  initialState: { isExit: false },
  reducers: {
    isExitAction: (state, action: PayloadAction<boolean>) => {
      state.isExit = action.payload;
    },
  },
});
export const { isExitAction } = deleteInfoPopupSlice.actions;
export default deleteInfoPopupSlice.reducer;
