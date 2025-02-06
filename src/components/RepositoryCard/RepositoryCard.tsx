import { forwardRef } from "react";
import styles from "./RepositoryCard.module.css";
import { motion } from "framer-motion";

interface RepositoryProps {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
}

export const RepositoryCard = forwardRef<HTMLDivElement, RepositoryProps>(
  (props, ref) => {
    const { name, description, html_url, stargazers_count, updated_at } = props;
    return (
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.card} ref={ref}>
          <h3>{name}</h3>
          <p>{description || "Описание отсутствует"}</p>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            Перейти
          </a>
          <p>⭐ {stargazers_count}</p>
          <p>Обновлено: {new Date(updated_at).toLocaleDateString()}</p>
        </div>
      </motion.div>
    );
  }
);
