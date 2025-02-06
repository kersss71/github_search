import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { loadRepositories } from "../features/repositorySlice";

export const useInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { status, hasMore, username, page, error } = useAppSelector(
    (state) => state.repos
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || status === "loading" || error) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(loadRepositories({ username, page }));
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [dispatch, hasMore, status, username, page, error]);

  return lastElementRef;
};
