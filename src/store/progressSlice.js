import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  progress: {
    sessionId: Date.now(),
    serverId: null,
    mode: null,
    questionsQuantity: 0,
    active: 1,
    answers: {},
    score: 0,
    scoreText: '',
  },
  status: null,
  error: null,
};

const baseUrl = 'https://literature-quiz-c9146-default-rtdb.firebaseio.com';

export const postSessionData = createAsyncThunk(
  'progress/postSessionData',
  async (_, { rejectWithValue, getState }) => {
    const { active, ...sessionData } = getState().progress.progress;

    try {
      const response = await fetch(`${baseUrl}/sessions.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить данные на сервер');
      }

      const data = await response.json();
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchResult = createAsyncThunk(
  'progress/fetchResult',
  async (level, { rejectWithValue }) => {
    try {
      const result = await fetch(`${baseUrl}/results/${level}.json`);

      if (!result.ok) {
        throw new Error('Ошибка сервера: не\u00A0удалось получить результат');
      }

      const text = await result.json();
      return text;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const setLoader = (state) => {
  state.status = 'loading';
  state.error = null;
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetProgress: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSessionData.pending, setLoader)
      .addCase(postSessionData.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.progress.serverId = action.payload;
      })
      .addCase(postSessionData.rejected, setError);
    builder
      .addCase(fetchResult.pending, setLoader)
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.progress.scoreText = action.payload;
      })
      .addCase(fetchResult.rejected, setError);
  },
});

export const { setProgress, resetProgress } = progressSlice.actions;

export default progressSlice.reducer;
