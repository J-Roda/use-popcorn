import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import WatchSummary from "./components/WatchSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import MovieDetails from "./components/MovieDetails";

const KEY = "77a6f72c";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    // const [watched, setWatched] = useState([]);
    const [watched, setWatched] = useState(function () {
        const storedValue = localStorage.getItem("watched");
        return JSON.parse(storedValue);
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
    }

    // Fetch the movies with abort controller and cleanup function to avoid multiple request
    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=77a6f72c&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("Movie not found");

                setMovies(data.Search);
                handleCloseMovie();
                setError("");
            } catch (error) {
                if (error.name === "AbortError") setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched]);

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            onHandleSelectMovies={handleSelectMovie}
                            movies={movies}
                        />
                    )}
                    {error && <ErrorMsg msg={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onHandleCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
