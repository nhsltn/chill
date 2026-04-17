import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import {
  getDataById,
  getCredits,
  getSeasonEpisodes,
  getAgeRating,
  getTrailerById,
  getSimilarMovies,
} from "../../services/api/tmdb";
import MovieSection from "../sections/MovieSection";
import MoviesCard from "./MoviesCard";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w780";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const STILL_BASE_URL = "https://image.tmdb.org/t/p/w300";

function DetailCard({
  id,
  mediaType,
  onClose,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const [detail, setDetail] = useState(null);
  const [credits, setCredits] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [ageRating, setAgeRating] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const timerRef = useRef(null);

  const inWatchlist = isInWatchlist(id);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const [detailRes, creditsRes, ratingRes, videoRes, similarRes] =
          await Promise.all([
            getDataById(id, mediaType),
            getCredits(id, mediaType),
            getAgeRating(id, mediaType),
            getTrailerById(id, mediaType),
            getSimilarMovies(id, mediaType),
          ]);

        if (cancelled) return;

        setDetail(detailRes.data);
        setCredits(creditsRes.data);

        const similars =
          similarRes.data.results?.slice(0, 3).map((m) => ({
            id: m.id,
            title: m.title || m.name,
            thumbnail: m.poster_path
              ? `${POSTER_BASE_URL}${m.poster_path}`
              : null,
            backdrop: m.backdrop_path
              ? `${BACKDROP_BASE_URL}${m.backdrop_path}`
              : null,
            voteAverage: m.vote_average,
            releaseDate: m.release_date || m.first_air_date,
            genreIds: m.genre_ids || [],
            mediaType,
            isNew: false,
          })) || [];
        setSimilarMovies(similars);

        const videos = videoRes.data.results;
        const trailer =
          videos.find(
            (v) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true,
          ) ||
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          videos.find(
            (v) =>
              v.type === "Teaser" &&
              v.site === "YouTube" &&
              v.official === true,
          ) ||
          videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
          videos.find((v) => v.site === "YouTube");
        setTrailerKey(trailer?.key || null);

        const ratingResults = ratingRes.data.results || [];
        if (mediaType === "movie") {
          const releaseData =
            ratingResults.find((r) => r.iso_3166_1 === "ID") ||
            ratingResults.find((r) => r.iso_3166_1 === "US") ||
            ratingResults[0];
          const validCert = releaseData?.release_dates?.find(
            (d) => d.certification,
          );
          setAgeRating(validCert?.certification || "");
        } else {
          const ratingData =
            ratingResults.find((r) => r.iso_3166_1 === "ID") ||
            ratingResults.find((r) => r.iso_3166_1 === "US") ||
            ratingResults[0];
          setAgeRating(ratingData?.rating || "");
          setSeasons(
            detailRes.data.seasons?.filter((s) => s.season_number > 0) || [],
          );
        }
      } catch (err) {
        console.error("Gagal fetch detail:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [id, mediaType]);

  useEffect(() => {
    setShowTrailer(false);
    setIsMuted(true);
    clearTimeout(timerRef.current);

    if (trailerKey) {
      timerRef.current = setTimeout(() => {
        setShowTrailer(true);
      }, 3000);
    }

    return () => clearTimeout(timerRef.current);
  }, [trailerKey]);

  useEffect(() => {
    if (mediaType !== "tv" || !id) return;
    let cancelled = false;

    const fetchEpisodes = async () => {
      setEpisodeLoading(true);
      try {
        const episodeRes = await getSeasonEpisodes(id, selectedSeason);
        if (!cancelled) setEpisodes(episodeRes.data.episodes || []);
      } catch (err) {
        console.error("Gagal fetch episodes:", err);
      } finally {
        if (!cancelled) setEpisodeLoading(false);
      }
    };

    fetchEpisodes();
    return () => {
      cancelled = true;
    };
  }, [selectedSeason, id, mediaType]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!id) return null;

  const title = detail?.title || detail?.name;
  const year =
    detail?.release_date || detail?.first_air_date
      ? new Date(detail.release_date || detail.first_air_date).getFullYear()
      : null;
  const genres = detail?.genres?.map((g) => g.name) || [];
  const cast = credits?.cast?.slice(0, 4).map((c) => c.name) || [];
  const creators =
    mediaType === "tv"
      ? detail?.created_by?.map((c) => c.name) || []
      : credits?.crew?.filter((c) => c.job === "Director").map((c) => c.name) ||
        [];

  const trailerSrc = trailerKey
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}&modestbranding=1`
    : null;

  const backdropUrl = detail?.backdrop_path
    ? `${BACKDROP_BASE_URL}${detail.backdrop_path}`
    : `${POSTER_BASE_URL}${detail?.poster_path}`;

  return (
    <div
      className="detail-card fixed inset-0 z-100 bg-black/70 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="wrapper relative flex flex-col bg-[#181818] rounded-2xl w-233.25 mx-auto mt-20 mb-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 bg-black/50 rounded-full p-2 text-white hover:bg-white/20 transition"
        >
          <FaTimes className="size-4" />
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-60 text-white">
            Loading...
          </div>
        ) : (
          <>
            <div className="relative w-full h-138.5 overflow-hidden rounded-t-2xl shrink-0">
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${showTrailer ? "opacity-0" : "opacity-100"}`}
                style={{ backgroundImage: `url(${backdropUrl})` }}
              />
              {showTrailer && trailerSrc && (
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[calc(100%+200px)] h-[calc(100%+100px)] min-w-[177.78vh] min-h-[56.25vw]"
                    src={trailerSrc}
                    title="Detail Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-transparent to-transparent" />
              <div className="absolute flex flex-col gap-6 w-193.25 bottom-30 left-1/2 -translate-x-1/2">
                <h2 className="text-white text-[32px] font-bold">{title}</h2>

                <div className="flex items-center justify-between">
                  <div className="movie-buttons flex gap-2.5">
                    <button className="start-button rounded-[48px] bg-primary-3 text-xs lg:text-base font-bold text-white py-1 lg:py-2.5 px-3 lg:px-7 gap-2 flex items-center">
                      Mulai
                    </button>
                    <button
                      onClick={() =>
                        onToggleWatchlist({
                          id,
                          title,
                          thumbnail: `${POSTER_BASE_URL}${detail?.poster_path}`,
                          backdrop: detail?.backdrop_path
                            ? `${BACKDROP_BASE_URL}${detail.backdrop_path}`
                            : null,
                          isNew: false,
                          voteAverage: detail?.vote_average,
                          releaseDate:
                            detail?.release_date || detail?.first_air_date,
                          genreIds: detail?.genres?.map((g) => g.id) || [],
                          mediaType,
                        })
                      }
                      className={`flex items-center justify-center border rounded-full size-12 transition-colors shrink-0 ${
                        inWatchlist
                          ? "bg-white border-white text-black"
                          : "border-white/60 hover:border-white text-white"
                      }`}
                    >
                      {inWatchlist ? (
                        <FaCheck className="size-6" />
                      ) : (
                        <FaPlus className="size-6" />
                      )}
                    </button>
                  </div>

                  {showTrailer && (
                    <button
                      onClick={() => setIsMuted((prev) => !prev)}
                      className="flex items-center justify-center border rounded-full border-white/60 text-white size-12 hover:border-white transition shrink-0"
                    >
                      {isMuted ? (
                        <MdVolumeOff className="size-6" />
                      ) : (
                        <MdVolumeUp className="size-6" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="detailed-information flex py-6 px-20 w-full gap-2.5">
              <div className="overview-content flex-1 flex flex-col gap-1">
                <div className="vid-main-info flex py-1 gap-4 items-center text-text-light-secondary text-base font-semibold">
                  <p className="release-date">{year}</p>
                  {mediaType === "tv" && detail?.number_of_episodes && (
                    <p className="episode">
                      {detail.number_of_episodes} episode
                    </p>
                  )}
                  {mediaType === "movie" && detail?.runtime && (
                    <p className="runtime">{detail.runtime} min</p>
                  )}
                  <p className="flex items-center justify-center border border-text-light-secondary rounded-lg px-2 py-1 text-sm">
                    {ageRating}
                  </p>
                </div>
                <p className="overview text-base text-text-light-primary font-normal">
                  {detail.overview}
                </p>
              </div>
              <div className="detailed-content flex flex-col flex-1 px-2.5 gap-1 text-base font-normal text-text-light-primary">
                <div className="cast-info flex gap-1">
                  <p className="w-28 shrink-0 text-text-light-secondary">
                    Cast
                  </p>
                  <p className="text-text-light-secondary">:</p>
                  <p>{cast.join(", ")}</p>
                </div>
                <div className="genre-info flex gap-1">
                  <p className="w-28 shrink-0 text-text-light-secondary">
                    Genres
                  </p>
                  <p className="text-text-light-secondary">:</p>
                  <p>{genres.join(", ")}</p>
                </div>
                <div className="creator-info flex gap-1">
                  <p className="w-28 shrink-0 text-text-light-secondary">
                    Pembuat {mediaType === "movie" ? "Film" : "Series"}
                  </p>
                  <p className="text-text-light-secondary">:</p>
                  <p>{creators.join(", ")}</p>
                </div>
              </div>
            </div>

            {mediaType === "tv" ? (
              <div className="episodes-information flex flex-col gap-7 py-6 px-20">
                <div className="episode-header flex justify-between">
                  <p className="font-bold text-text-light-primary text-2xl">
                    Episode
                  </p>
                  {seasons.length > 1 && (
                    <select
                      value={selectedSeason}
                      onChange={(e) =>
                        setSelectedSeason(Number(e.target.value))
                      }
                      className="bg-[#2a2a2a] text-white text-sm border border-white/20 rounded-md px-3 py-1.5 cursor-pointer focus:outline-none w-auto"
                    >
                      {seasons.map((s) => (
                        <option key={s.season_number} value={s.season_number}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="episode-list flex flex-col gap-4 px-6">
                  {episodeLoading ? (
                    <div className="text-white/50 text-sm text-center py-4">
                      Loading episodes...
                    </div>
                  ) : (
                    episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className="flex gap-6 text-text-light-primary font-semibold items-center"
                      >
                        <p className="ep-number">{ep.episode_number}</p>
                        <div className="ep-thumbnail w-42.5 h-24">
                          <img
                            src={
                              ep.still_path
                                ? `${STILL_BASE_URL}${ep.still_path}`
                                : `${POSTER_BASE_URL}${detail?.poster_path}`
                            }
                            alt={ep.name}
                            className="w-full h-full rounded-t-sm"
                          />
                        </div>
                        <div className="ep-detail flex flex-col gap-2.5 w-119">
                          <div className="ep-detail-header flex justify-between">
                            <p className="ep-name">{ep.name}</p>
                            <p className="ep-runtime">{ep.runtime} min</p>
                          </div>
                          <p className="text-text-light-secondary font-normal line-clamp-2">
                            {ep.overview}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              similarMovies.length > 0 && (
                <MovieSection
                  title="Film Serupa"
                  movies={similarMovies}
                  CardComponent={MoviesCard}
                  onToggleWatchlist={onToggleWatchlist}
                  isInWatchlist={isInWatchlist}
                  itemsPerPage={3}
                  simple={true}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailCard;
