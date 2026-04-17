import { useMemo } from "react";
import { BACKDROP_BASE_URL } from "../utils/mediaMapper";

export function useContinueWatching(
  watchlist,
  allTrending,
  mediaTypeFilter = null,
) {
  const continueMovies = useMemo(() => {
    if (allTrending.length === 0) return [];

    const filtered = mediaTypeFilter
      ? watchlist.filter((m) => m.mediaType === mediaTypeFilter)
      : watchlist;

    const watchlistItems = filtered.slice(0, 8).map((m) => ({
      id: m.movieId,
      title: m.title,
      thumbnail: m.backdropPath || m.posterPath,
      isNew: m.isNew || false,
      progress: 10 + (Number(m.movieId) % 71),
    }));

    if (watchlistItems.length < 8) {
      const needed = 8 - watchlistItems.length;
      const watchlistIds = new Set(watchlistItems.map((m) => m.id));

      const randomFill = allTrending
        .filter((m) => !watchlistIds.has(m.id) && m.backdrop_path)
        .slice(0, needed)
        .map((m) => ({
          id: m.id,
          title: m.title || m.name,
          thumbnail: `${BACKDROP_BASE_URL}${m.backdrop_path}`,
          isNew: false,
          progress: 10 + (m.id % 71),
        }));

      return [...watchlistItems, ...randomFill];
    }

    return watchlistItems;
  }, [watchlist, allTrending, mediaTypeFilter]);

  return continueMovies;
}
