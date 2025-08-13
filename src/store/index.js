import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';
import questionsReducer from './questionsSlice';

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    questions: questionsReducer,
  },
});
