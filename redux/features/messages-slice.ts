import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MessageState = {
  value: { message: string; isUser: boolean }[];
  count: number;
  user: {
    name: string;
    age: number;
  };
};

const initialState = {
  value: [
    {
      message: "Hello, Welcome to student info system!",
      isUser: false,
    },
  ],
  count: -1,
  user: {
    name: "",
    age: 0,
  },
} as MessageState;

export const messageSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageState["value"][0]>) => {
      state.value = [...state.value, action.payload];
      const gotItMessage = state.value.find(
        (message) =>
          message.message.toUpperCase() === "Got it!".toUpperCase() &&
          message.isUser
      );
      if (gotItMessage) {
        const gotItMessageIndex = state.value.indexOf(gotItMessage);
        if (gotItMessageIndex === state.value.length - 1) {
          state.value = [
            ...state.value,
            {
              message: "Enter your Name",
              isUser: false,
            },
          ];
        }
      }
      const enterYourNameMessage = state.value.find(
        (message) =>
          message.message.toUpperCase() === "Enter your Name".toUpperCase() &&
          !message.isUser
      );
      if (enterYourNameMessage) {
        const enterYourNameMessageIndex =
          state.value.indexOf(enterYourNameMessage);
        if (enterYourNameMessageIndex === state.value.length - 2) {
          state.user.name = state.value[state.value.length - 1].message;
          state.value = [
            ...state.value,
            {
              message: "Enter your Age",
              isUser: false,
            },
          ];
        }
      }
      const enterYourAge = state.value.find(
        (message) =>
          message.message.toUpperCase() === "Enter your Age".toUpperCase() &&
          !message.isUser
      );
      if (enterYourAge) {
        const enterYourAgeIndex = state.value.indexOf(enterYourAge);
        if (enterYourAgeIndex === state.value.length - 2) {
          state.user.age = parseInt(
            state.value[state.value.length - 1].message
          );
          state.value = [
            ...state.value,
            {
              message: "Thank you. In 5 seconds, bot will exit",
              isUser: false,
            },
          ];
          state.count = 5;
        }
      }
    },
    decrementCount: (state) => {
      state.count -= 1;
    },
  },
});

export const { addMessage, decrementCount } = messageSlice.actions;
export default messageSlice.reducer;
