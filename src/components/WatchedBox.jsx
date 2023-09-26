import { useState } from "react";
import WatchSummary from "./WatchSummary";
import WatchedMovieList from "./WatchedMovieList";

const WatchedBox = ({ watched, avgImdbRating, avgUserRating, avgRuntime }) => {
    const [isOpen2, setIsOpen2] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchSummary
                        watched={watched}
                        avgImdbRating={avgImdbRating}
                        avgUserRating={avgUserRating}
                        avgRuntime={avgRuntime}
                    />

                    <WatchedMovieList watched={watched} />
                </>
            )}
        </div>
    );
};

export default WatchedBox;
