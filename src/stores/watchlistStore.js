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
          set({
            watchlist: watchlist.filter((w) => w.movieId !== String(movie.id)),
          });
          try {
            await removeFromWatchlist(existing.wathclistId || existing.id);
            toast.success("Dihapus dari watchlist!");
          } catch {
            set({ watchlist });
            toast.error("Gagal menghapus dari watchlist!");
          }
        } else {
          const newItem = {
            userId: String(userId),
            movieId: String(movie.id),
            title: movie.title,
            posterPath: movie.thumbnail,
            backdropPath: movie.backdrop || null,
            voteAverage: String(movie.voteAverage ?? ""),
            releaseDate: String(movie.releaseDate ?? ""),
            isNew: movie.isNew ?? false,
            addedAt: new Date().toISOString(),
          };

          set({ watchlist: [...watchlist, { ...newItem, id: "temp" }] });
          try {
            const res = await addToWatchlist(newItem);
            set({
              watchlist: [
                ...get().watchlist.filter((w) => w.id !== "temp"),
                res.data,
              ],
            });
            toast.success("Ditambahkan ke watchlist!");
          } catch {
            set({ watchlist });
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
