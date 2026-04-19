import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext.jsx";
import { useModal } from "./hooks/useModal";
import DetailCard from "./components/cards/DetailCard";
import { useWatchlist } from "./hooks/useWatchlist";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";
import Series from "./pages/Series";
import Movies from "./pages/Movies";

function GlobalModal() {
  const { modalData, handleCloseDetail } = useModal();
  const { handleToggleWatchlist, isInWatchlist } = useWatchlist();

  if (!modalData) return null;

  return (
    <DetailCard
      id={modalData.id}
      mediaType={modalData.mediaType}
      onClose={handleCloseDetail}
      onToggleWatchlist={handleToggleWatchlist}
      isInWatchlist={isInWatchlist}
    />
  );
}
function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movies" element={<Movies />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <GlobalModal />
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
