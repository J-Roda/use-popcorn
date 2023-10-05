import Movie from "./Movie";

const MovieList = ({ movies, onHandleSelectMovies }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onHandleSelectMovies={onHandleSelectMovies}
                />
            ))}
        </ul>
    );
};

export default MovieList;
