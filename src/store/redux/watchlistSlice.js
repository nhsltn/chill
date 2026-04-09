import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../../services/api/watchlist";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetch",
  async (userId) => {
    try {
      const res = await getWatchlist(userId);
      return res.data || [];
    } catch (err) {
      if (err.response?.status !== 404) toast.error("Gagal memuat watchlist!");
      return [];
    }
  },
);

export const toggleWatchlist = createAsyncThunk(
  "watchlist/toggle",
  async ({ userId, movie }, { getState, dispatch }) => {
    const { watchlist } = getState().watchlist;
    const existing = watchlist.find((w) => w.movieId === String(movie.id));

    if (existing) {
      dispatch(removeItem(existing.movieId));
      try {
        await removeFromWatchlist(existing.watchlistId);
        toast.success("Dihapus dari watchlist!");
      } catch {
        dispatch(addItem({ ...existing }));
        toast.error("Gagal menghapus dari watchlist!");
      }
    } else {
      const tempId = `temp-${Date.now()}`;
      const newItem = {
        userId: String(userId),
        movieId: String(movie.id),
        title: movie.title,
        posterPath: movie.thumbnail,
        backdropPath: movie.backdrop || null,
        voteAverage: String(movie.voteAverage ?? ""),
        releaseDate: String(movie.releaseDate ?? ""),
        genreIds: movie.genreIds || [],
        mediaType: movie.mediaType || "movie",
        isNew: movie.isNew ?? false,
        addedAt: new Date().toISOString(),
        watchlistId: tempId,
      };
      dispatch(addItem(newItem));
      try {
        const res = await addToWatchlist({
          ...newItem,
          watchlistId: undefined,
        });
        dispatch(replaceTemp({ tempId, realItem: res.data }));
        toast.success("Ditambahkan ke watchlist!");
      } catch {
        dispatch(removeItem(String(movie.id)));
        toast.error("Gagal menambahkan ke watchlist!");
      }
    }
  },
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlist: [],
    loading: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeItem: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (w) => w.movieId !== action.payload,
      );
    },
    replaceTemp: (state, action) => {
      const { tempId, realItem } = action.payload;
      const idx = state.watchlist.findIndex((w) => w.watchlistId === tempId);
      if (idx !== -1) state.watchlist[idx] = realItem;
    },
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addItem, removeItem, replaceTemp, clearWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
