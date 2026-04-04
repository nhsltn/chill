import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { fetchAllUsers, createUser } from "../services/api/user";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      loading: false,

      register: async (username, password, navigate) => {
        set({ loading: true });
        try {
          const res = await fetchAllUsers();
          const exists = res.data.find((u) => u.username === username);
          if (exists) {
            toast.error("Username sudah terpakai, gunakan username lain!");
            return;
          }
          await createUser({ username, password });
          toast.success("Pendaftaran sukses! Silakan Login.");
          navigate("/login");
        } catch {
          toast.error("Pendaftaran gagal, coba lagi!");
        } finally {
          set({ loading: false });
        }
      },

      login: async (username, password, navigate) => {
        set({ loading: true });
        try {
          const res = await fetchAllUsers();
          const match = res.data.find(
            (u) => u.username === username && u.password === password,
          );
          if (!match) {
            toast.error("Username atau password salah!");
            return;
          }
          set({ user: match, isLoggedIn: true });
          toast.success(`Selamat datang, ${match.username}!`);
          navigate("/");
        } catch {
          toast.error("Gagal login, coba lagi!");
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
        toast.success("Anda telah keluar.");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
