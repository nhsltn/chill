import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../services/api/watchlist";

export const useWatchlistStore = create(
  persist(
    (set, get) => ({
      watchlist: [],
      loading: false,

      fetchWatchlist: async (userId) => {
        set({ loading: true });
        try {
          const res = await getWatchlist(userId);
          set({ watchlist: res.data || [] });
        } catch (err) {
          if (err.response?.status !== 404) {
            toast.error("Gagal memuat watchlist!");
          }
          set({ watchlist: [] });
        } finally {
          set({ loading: false });
        }
      },

      toggleWatchlist: async (userId, movie) => {
        const { watchlist } = get();
        const existing = watchlist.find((w) => w.movieId === String(movie.id));

        if (existing) {
          console.log("existing:", existing);

          set({
            watchlist: watchlist.filter((w) => w.movieId !== String(movie.id)),
          });
          try {
            await removeFromWatchlist(existing.watchlistId);
            toast.success("Dihapus dari watchlist!");
          } catch {
            set({ watchlist });
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
          };

          set({
            watchlist: [...watchlist, { ...newItem, watchlistId: tempId }],
          });
          try {
            const res = await addToWatchlist(newItem);
            set({
              watchlist: [
                ...get().watchlist.filter((w) => w.watchlistId !== tempId),
                res.data,
              ],
            });
            toast.success("Ditambahkan ke watchlist!");
          } catch {
            set({
              watchlist: get().watchlist.filter(
                (w) => w.watchlistId !== tempId,
              ),
            });
            toast.error("Gagal menambahkan ke watchlist!");
          }
        }
      },

      isInWatchlist: (movieId) => {
        return get().watchlist.some((w) => w.movieId === String(movieId));
      },

      clearWatchlist: () => {
        set({ watchlist: [] });
      },
    }),
    {
      name: "watchlist-storage",
      partialize: (state) => ({ watchlist: state.watchlist }),
    },
  ),
);
