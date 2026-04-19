export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";
import { MOVIE_GENRES, TV_GENRES } from "../data/genres";

export const mapMovie = (movie, type = "movie") => ({
  id: movie.id,
  title: movie.title || movie.name,
  thumbnail: `${POSTER_BASE_URL}${movie.poster_path}`,
  backdrop: movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : null,
  isNew: false,
  mediaType: type,
  voteAverage: movie.vote_average,
  releaseDate: movie.release_date || movie.first_air_date,
  genreIds: movie.genre_ids,
});

export { MOVIE_GENRES, TV_GENRES };
export const getGenreNames = (genreIds = [], mediaType) => {
  const genreMap = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;
  return genreIds
    .slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean);
};

export const mapSeries = (series) => mapMovie(series, "tv");
