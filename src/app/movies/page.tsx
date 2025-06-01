'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getMovies, searchMovies, getGenres } from '@/lib/api';
import MovieCard from '@/app/components/MovieCard/MovieCard';
import GenresFilter from '@/app/components/GenresFilter/GenresFilter';
import Pagination from '@/app/components/Pagination/Pagination';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const query = searchParams.get('query');
    const genreId = searchParams.get('genre');
    const page = Number(searchParams.get('page')) || 1;

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(query || '');

    useEffect(() => {
        const fetchData = async () => {
            const [genreRes, movieRes] = await Promise.all([
                getGenres(),
                query ? searchMovies(query, page) : getMovies(page),
            ]);

            setGenres(genreRes.genres);
            setTotalPages(movieRes.total_pages);

            const filteredMovies = genreId
                ? movieRes.results.filter((m: any) => m.genre_ids.includes(Number(genreId)))
                : movieRes.results;

            setMovies(filteredMovies);
        };

        fetchData();
    }, [query, genreId, page]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/movies?query=${encodeURIComponent(search.trim())}&page=1`);
        }
    };

    return (
        <main className={styles.container}>
            <h1>Movies</h1>

            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    type="text"
                    value={search}
                    placeholder="Search movies..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <GenresFilter genres={genres} />

            <div className={styles.grid}>
                {movies.map((movie: any) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                    />
                ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} />
        </main>
    );
}