import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({
    selectedId,
    onHandleCloseMovie,
    onAddWatched,
    watched,
}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(() => {
        if (userRating) countRef.current++;
    }, [userRating]);

    // const isWatched = watched.filter((w) => w.imdbId === selectedId);
    const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);
    const movieRating = watched.find(
        (movie) => movie.imdbId === selectedId
    )?.userRating;

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
            countRatingDecission: countRef.current,
        };

        if (watched.length < 1) {
            onAddWatched(newWatchedMovie);
        } else {
            const result = watched.every((w) => w.imdbId !== selectedId);
            result && onAddWatched(newWatchedMovie);
        }
    }

    useEffect(() => {
        const callback = (e) => {
            if (e.code === "Escape") {
                onHandleCloseMovie();
                console.log("CLPSO");
            }
        };

        document.addEventListener("keydown", callback);

        return () => document.removeEventListener("keydown", callback);
    }, [onHandleCloseMovie]);

    useEffect(() => {
        setIsLoading(true);
        async function getMovieDetails() {
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=77a6f72c&i=${selectedId}`
            );
            const data = await res.json();
            setMovie(data);

            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return () => {
            document.title = `usePopcorn`;
        };
    }, [title]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={onHandleCloseMovie}
                        >
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bul; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {/* {isWatched ? (
                                <StarRating
                                    maxRating={10}
                                    size={24}
                                    onSetRating={setUserRating}
                                    defaultRating={isWatched[0]?.userRating}
                                />
                            ) : (
                                <StarRating
                                    maxRating={10}
                                    size={24}
                                    onSetRating={setUserRating}
                                />
                            )}

                            {userRating > 0 && (
                                <button className="btn-add" onClick={handleAdd}>
                                    + Add to list
                                </button>
                            )} */}

                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />

                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    ALREADY RATED THE MOVIE {movieRating}{" "}
                                    <span>⭐</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
