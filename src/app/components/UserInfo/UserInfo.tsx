import styles from './styles.module.css';

interface UserInfoProps {
    name: string;
}

export default function UserInfo({ name }: UserInfoProps) {
    return (
        <div className={styles.user}>
            <div className={styles.avatar} />
            <span className={styles.name}>{name}</span>
        </div>
    );
}