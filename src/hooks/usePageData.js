import { useState, useEffect } from "react";
import {
  getDataById,
  getTrailerById,
  getAgeRating,
} from "../services/api/tmdb";
import { pickTrailerKey, parseAgeRating } from "../utils/heroHelpers";
import { BACKDROP_BASE_URL } from "../utils/mediaMapper";

export function usePageData(fetchFn, mediaType) {
  const [allTrending, setAllTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const { lists, trendingRaw } = await fetchFn();
        if (cancelled) return;

        if (lists.topRated) setTopRated(lists.topRated);
        if (lists.trending) setTrending(lists.trending);
        if (lists.newRelease) setNewRelease(lists.newRelease);
        if (lists.popular) setPopular(lists.popular);
        setAllTrending(trendingRaw);

        const random =
          trendingRaw[Math.floor(Math.random() * trendingRaw.length)];
        const heroMediaType = random.media_type || mediaType;

        const [detailRes, videoRes, ratingRes] = await Promise.all([
          getDataById(random.id, heroMediaType),
          getTrailerById(random.id, heroMediaType),
          getAgeRating(random.id, heroMediaType),
        ]);

        if (cancelled) return;

        setHeroData({
          title: detailRes.data.title || detailRes.data.name,
          overview: detailRes.data.overview || "",
          backdrop: random.backdrop_path
            ? `${BACKDROP_BASE_URL}${random.backdrop_path}`
            : null,
          trailerKey: pickTrailerKey(videoRes.data.results),
          ageRating:
            parseAgeRating(ratingRes.data.results || [], heroMediaType) || null,
        });
      } catch (err) {
        if (!cancelled) console.error("Gagal fetch page data:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    allTrending,
    topRated,
    trending,
    newRelease,
    popular,
    heroData,
    loading,
  };
}
