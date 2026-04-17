import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWatchlist,
  toggleWatchlist,
  clearWatchlist,
} from "../store/redux/watchlistSlice";

export function useWatchlist() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { watchlist } = useSelector((state) => state.watchlist);

  useEffect(() => {
    if (isLoggedIn && user?.userId) {
      dispatch(fetchWatchlist(user.userId));
    } else {
      dispatch(clearWatchlist());
    }
  }, [isLoggedIn, user?.userId, dispatch]);

  const isInWatchlist = (movieId) =>
    watchlist.some((w) => w.movieId === String(movieId));

  const handleToggleWatchlist = (movie) => {
    if (!isLoggedIn) return;
    dispatch(toggleWatchlist({ userId: user.userId, movie }));
  };

  return { watchlist, isInWatchlist, handleToggleWatchlist, isLoggedIn };
}
