import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useApp";
import {
  setUsername,
  loadRepositories,
  clearError,
} from "../../features/repositorySlice";
import { debounce } from "lodash";
import styles from "./Search.module.css";

export const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((username: string) => {
    dispatch(clearError());
    dispatch(setUsername(username));
    dispatch(loadRepositories({ username, page: 1 }));
  }, 500);

  useEffect(() => {
    if (input.trim()) {
      debouncedSearch(input);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleReset = () => {
    setInput("");
    dispatch(setUsername(""));
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Введите имя пользователя GitHub..."
        value={input}
        onChange={handleInputChange}
      />
      <button className={styles.resetButton} onClick={handleReset}>
        ✖
      </button>
    </div>
  );
};
