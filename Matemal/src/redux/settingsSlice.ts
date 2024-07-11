import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 
type SettingsSlice = {
    language: string;
    sound: boolean;
}

const initialState: SettingsSlice = {
    language: 'en',
    sound: true,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        changeLanguage: (
            state, 
            action: PayloadAction<{ newLanguage: string }>) => {
                state.language = action.payload.newLanguage;
        },
        changeSound: (
            state, 
            action: PayloadAction<{ newSound: boolean }>) => {
                state.sound = action.payload.newSound;
        },
    }
});

export const { changeLanguage, changeSound } = settingsSlice.actions;

export default settingsSlice.reducer;