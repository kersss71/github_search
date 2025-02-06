import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchRepos } from "../../features/repositorySlice";
import { FC } from "react";
import cls from "./Home.module.css";
import { SearchBar } from "../../components/Search/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import { RepoCard } from "../../components/RepositoryCard/RepositoryCard";

export const Home: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, username, page, status } = useSelector(
    (state: RootState) => state.repos
  );

  return (
    <div className={cls.contaier}>
      <SearchBar />
      {status === "loading" && <p>Загрузка...</p>}
      <InfiniteScroll
        dataLength={repos.length}
        next={() => dispatch(fetchRepos({ username, page: page }))}
        hasMore={true}
        loader={<h4>Загрузка...</h4>}
      >
        {repos.map((repo) => (
          <RepoCard key={repo.id} {...repo} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
