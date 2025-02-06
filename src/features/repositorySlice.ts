import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRepositories } from '../services/githubApi';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

interface RepositoryState {
  repos: Repository[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  hasMore: boolean;
  page: number;
  username: string;
}

const initialState: RepositoryState = {
  repos: [],
  status: 'idle',
  error: null,
  hasMore: true,
  page: 1,
  username: '',
};

export const loadRepositories = createAsyncThunk(
  'repositories/loadRepositories',
  async ({ username, page }: { username: string; page: number }, { rejectWithValue }) => {
    try {
      return await fetchRepositories(username, page);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const repositorySlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.repos = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null; 
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRepositories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadRepositories.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.repos = [...state.repos, ...action.payload];
          state.page += 1;
        }
        state.status = 'idle';
      })
      .addCase(loadRepositories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setUsername, clearError } = repositorySlice.actions;
export default repositorySlice.reducer;