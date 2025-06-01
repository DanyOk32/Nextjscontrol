'use client';

import Link from 'next/link';
import styles from './styles.module.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

interface MovieCardI {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

export default function MovieCard({ id, title, poster_path, vote_average }: MovieCardI) {
    return (
        <Link href={`/movies/${id}`} className={styles.card}>
            <img
                src={`${imageBaseUrl}${poster_path}`}
                alt={title}
                className={styles.poster}
            />
            <h3>{title}</h3>
            <p>⭐ {vote_average}</p>
        </Link>
    );
}