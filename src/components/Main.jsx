import { useState } from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

const Main = ({
    movies,
    watched,
    avgImdbRating,
    avgUserRating,
    avgRuntime,
}) => {
    return (
        <main className="main">
            <ListBox movies={movies} />
            <WatchedBox
                watched={watched}
                avgImdbRating={avgImdbRating}
                avgUserRating={avgUserRating}
                avgRuntime={avgRuntime}
            />
        </main>
    );
};

export default Main;
