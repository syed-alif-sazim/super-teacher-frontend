import { createSlice } from '@reduxjs/toolkit';

const attemptsSlice = createSlice({
  name: 'attempts',
  initialState: {
    attemptsLeft: 3,
  },
  reducers: {
    setAttemptsLeft: (state, action) => {
      state.attemptsLeft = action.payload;
    },
  },
});

export const { setAttemptsLeft } = attemptsSlice.actions;
export default attemptsSlice.reducer;
