import { PayloadAction, createSlice } from "@reduxjs/toolkit";
 
type SettingsSlice = {
    language: string;
    sound: boolean;
    music: boolean;
    difficulty: string;
}

const initialState: SettingsSlice = {
    language: 'en',
    sound: true,
    music: true,
    difficulty: 'easy',
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
        changeMusic: (
            state, 
            action: PayloadAction<{ newMusic: boolean }>) => {
                state.music = action.payload.newMusic;
        },
        changeDifficulty: (
            state, 
            action: PayloadAction<{ newDifficulty: string }>) => {
                state.difficulty = action.payload.newDifficulty;
        },
    }
});

export const { changeLanguage, changeSound, changeMusic, changeDifficulty } = settingsSlice.actions;

export default settingsSlice.reducer;