'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';

interface PaginationI {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationI) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(`/movies?${params.toString()}`);
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                ← Назад
            </button>

            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Вперёд →
            </button>
        </div>
    );
}