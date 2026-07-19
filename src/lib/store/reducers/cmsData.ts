import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CmsDataState {
  home: any | null;
  loaded: boolean;
}

const initialState: CmsDataState = {
  home: null,
  loaded: false,
};

const cmsDataSlice = createSlice({
  name: 'cmsData',
  initialState,
  reducers: {
    setCmsHome: (state, action: PayloadAction<any>) => {
      state.home = action.payload;
      state.loaded = true;
    },
  },
});

export const { setCmsHome } = cmsDataSlice.actions;
export default cmsDataSlice.reducer;
