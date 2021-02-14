import React , {useState} from "react";
import MovieCard from './MovieCard'
export default function SearchMovies() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);


    const searchMovies = async (e) => {
        e.preventDefault();


        const url = `https://api.themoviedb.org/3/search/movie?api_key=75d1a99cfa5994303e44c1c1ca107b8c&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results)
            console.log(data);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div>
        <form className="form" onSubmit={searchMovies}>
            <label htmlFor="query" className="Label">
                Movie Name</label>
            <input className="input" type="text" name="query" placeholder="i.e. Jurassic Park"value={query}
	onChange={(e) => setQuery(e.target.value)} />
        

            <button className="button" type="submit"  > Search </button>
        </form>
        <div className="card-list">
        {movies && movies.filter(movie => movie.poster_path).map((movie)=>{
            return (
                <MovieCard  key={movie.id} movie={movie}></MovieCard>
            )
        })}
        </div>
        </div>
    )
}