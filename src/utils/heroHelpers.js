export const pickTrailerKey = (videos = []) => {
  const trailer =
    videos.find(
      (v) =>
        v.type === "Trailer" && v.site === "YouTube" && v.official === true,
    ) ||
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find(
      (v) => v.type === "Teaser" && v.site === "YouTube" && v.official === true,
    ) ||
    videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
    videos.find((v) => v.site === "YouTube");

  return trailer?.key || null;
};

export const parseAgeRating = (ratingResults = [], mediaType) => {
  if (mediaType === "movie") {
    const releaseData =
      ratingResults.find((r) => r.iso_3166_1 === "ID") ||
      ratingResults.find((r) => r.iso_3166_1 === "US") ||
      ratingResults[0];
    const validCert = releaseData?.release_dates?.find((d) => d.certification);
    return validCert?.certification || "";
  } else {
    const ratingData =
      ratingResults.find((r) => r.iso_3166_1 === "ID") ||
      ratingResults.find((r) => r.iso_3166_1 === "US") ||
      ratingResults[0];
    return ratingData?.rating || "";
  }
};
