import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, onDeleteWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbId}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
};

export default WatchedMovieList;
