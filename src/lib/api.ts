const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2QwZjM2YmMwNDI1MTk5Mzg1MjI3NGFhMDQzYTlmMSIsIm5iZiI6MTc0Njk1MzYzMi43MDUsInN1YiI6IjY4MjA2NWEwZTFjMDdkNjg4OTJkMTUzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q_J5-eiHw6hLGDsJPab0zhaW9OambXM_3pZSJgvl-Fs';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchFromAPI(endpoint: string) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: API_TOKEN,
        },
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export function getMovies(page = 1) {
    return fetchFromAPI(`/movie/popular?page=${page}`);
}

export function searchMovies(query: string, page = 1) {
    return fetchFromAPI(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

export function getGenres() {
    return fetchFromAPI(`/genre/movie/list`);
}

export function getMovieById(id: string) {
    return fetchFromAPI(`/movie/${id}`);
}