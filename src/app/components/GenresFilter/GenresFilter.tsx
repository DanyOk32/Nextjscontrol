'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';

interface GenreI {
    id: number;
    name: string;
}

interface GenresFilterI {
    genres: GenreI[];
}

export default function GenresFilter({ genres }: GenresFilterI) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const current = searchParams.get('genre');

    const handleGenreClick = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (current === String(id)) {
            params.delete('genre');
        } else {
            params.set('genre', String(id));
        }
        router.push(`/movies?${params.toString()}`);
    };

    return (
        <div className={styles.container}>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    className={`${styles.button} ${current === String(genre.id) ? styles.active : ''}`}
                    onClick={() => handleGenreClick(genre.id)}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}