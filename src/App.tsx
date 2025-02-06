import { useAppSelector } from "./hooks/useApp";
import { Search } from "./components/Search/Search";
import { RepositoryCard } from "./components/RepositoryCard/RepositoryCard";
import { useInfiniteScroll } from "./hooks/useInfinityScroll";
import styles from "./App.module.css";
import { Loading } from "./components/Loading/Loading";

export const App = () => {
  const { repos, status, error, username } = useAppSelector((state) => state.repos);
  const lastElementRef = useInfiniteScroll();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Github Search</h1>
      <Search />
      {error && <p className={styles.error}>{error}</p>}
      {repos.length === 0 && status === "idle" && username === "" && (
        <p className={styles.noData}>Введите имя пользователя GitHub</p>
      )}
      {repos.length === 0 && status === "idle" && username !== "" && (
        <p className={styles.noData}>Репозиториев нет</p>
      )}
      {repos.map((repo, index) => (
        <RepositoryCard
          key={repo.id}
          {...repo}
          ref={index === repos.length - 1 ? lastElementRef : null}
        />
      ))}
      {status === "loading" && <Loading />}
    </div>
  );
};