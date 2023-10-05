// export const useMovies = () => {
//     // Fetch the movies with abort controller and cleanup function to avoid multiple request
//     useEffect(() => {
//         const controller = new AbortController();

//         async function fetchMovies() {
//             try {
//                 setIsLoading(true);
//                 setError("");

//                 const res = await fetch(
//                     `http://www.omdbapi.com/?apikey=77a6f72c&s=${query}`,
//                     { signal: controller.signal }
//                 );

//                 if (!res.ok)
//                     throw new Error(
//                         "Something went wrong with fetching movies"
//                     );

//                 const data = await res.json();

//                 if (data.Response === "False")
//                     throw new Error("Movie not found");

//                 setMovies(data.Search);
//                 handleCloseMovie();
//                 setError("");
//             } catch (error) {
//                 if (error.name === "AbortError") setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         if (query.length < 3) {
//             setMovies([]);
//             setError("");
//             return;
//         }

//         fetchMovies();

//         return () => {
//             controller.abort();
//         };
//     }, [query]);

//     return <div>useMovies</div>;
// };
