import styles from './styles.module.css';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

interface MovieDetailsI {
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres?: { id: number; name: string }[];
}

export default function MovieDetails({title, overview, poster_path, release_date,
    vote_average, genres = [],}: MovieDetailsI) {
    return (
        <div className={styles.container}>
            <img
                src={`${imageBaseUrl}${poster_path}`}
                alt={title}
                className={styles.poster}
            />
            <div className={styles.info}>
                <h1>{title}</h1>
                <p><strong>Release date:</strong> {release_date}</p>
                <p><strong>Rating:</strong> ⭐ {vote_average}</p>
                {genres.length > 0 && (
                    <p><strong>Genres:</strong> {genres.map(g => g.name).join(', ')}</p>
                )}
                <p className={styles.overview}>{overview}</p>
            </div>
        </div>
    );
}
