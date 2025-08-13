import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (difficulty, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://literature-quiz-c9146-default-rtdb.firebaseio.com/${difficulty}.json`
      );

      if (!response.ok) {
        throw new Error('Ошибка сервера: не\u00A0удалось загрузить вопросы');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export default questionsSlice.reducer;
