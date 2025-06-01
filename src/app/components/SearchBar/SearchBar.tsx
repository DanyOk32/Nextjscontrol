'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className={styles.form}>
            <input
                className={styles.input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск фильма..."
            />
            <button type="submit" className={styles.button}>Найти</button>
        </form>
    );
}