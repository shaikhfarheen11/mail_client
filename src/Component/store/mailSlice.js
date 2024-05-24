import { createSlice } from "@reduxjs/toolkit";

export const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        sendMessageIsOpen: false,
        selectedMessage: null,
        emails: [], 
    },
    reducers: {
        openSendMessage: (state) => {
            state.sendMessageIsOpen = true;
        },
        closeSendMessage: (state) => {
            state.sendMessageIsOpen = false;
        },
        openMessage: (state, action) => {
            state.selectedMessage = action.payload;
        },
        addEmail: (state, action) => {
            state.emails.push(action.payload); 
        },
    },
});

export const { openSendMessage, closeSendMessage, openMessage, addEmail } = mailSlice.actions;
export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;
export const selectedMail = (state) => state.mail.selectedMessage;
export const selectEmails = (state) => state.mail.emails; 
export default mailSlice.reducer;
