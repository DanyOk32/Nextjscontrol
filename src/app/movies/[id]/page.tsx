import { getMovieById } from '@/lib/api';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const movie = await getMovieById(params.id);
    return {
        title: movie.title,
        description: movie.overview,
    };
}
import MovieDetails from '@/app/components/MovieDetails/MovieDetails';

interface MoviePageI {
    params: { id: string };
}

export default async function MoviePage({ params }: MoviePageI) {
    const movie = await getMovieById(params.id);

    return (
        <main>
            <MovieDetails
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                genres={movie.genres}
            />
        </main>
    );
}
