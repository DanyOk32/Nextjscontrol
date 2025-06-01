'use client';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import GenresFilter from '../GenresFilter/GenresFilter';
import Pagination from '../Pagination/Pagination';
import styles from './styles.module.css';

type MovieType = {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
};

export default function MoviesList() {
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState<number | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}${genre ? `&with_genres=${genre}` : ''}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
                },
            });
            const data = await res.json();
            setMovies(data.results);
        };
        fetchMovies();
    }, [page, genre]);

    return (
        <div className={styles.wrapper}>
            <GenresFilter onSelectGenre={setGenre} />
            <div className={styles.grid}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <Pagination page={page} onChange={setPage} />
        </div>
    );
}