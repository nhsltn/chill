import { useState, useEffect, useRef } from "react";

export function useTrailerVideo(trailerKey) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeKey, setActiveKey] = useState(trailerKey);
  const timerRef = useRef(null);

  if (activeKey !== trailerKey) {
    setActiveKey(trailerKey);
    setShowTrailer(false);
    setIsMuted(true);
  }

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (!activeKey) return;

    timerRef.current = setTimeout(() => {
      setShowTrailer(true);
    }, 3000);

    return () => clearTimeout(timerRef.current);
  }, [activeKey]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return { isMuted, showTrailer, toggleMute };
}
