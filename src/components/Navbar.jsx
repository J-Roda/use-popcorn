import { useState } from "react";
import Search from "./Search";

const Navbar = ({ movies }) => {
    const [query, setQuery] = useState("");

    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>

            <Search query={query} setQuery={setQuery} />

            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    );
};

export default Navbar;
