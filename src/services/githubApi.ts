import axios from "axios";
import { AxiosError } from "axios";

const GITHUB_API_URL = "https://api.github.com";

export const fetchRepositories = async (username: string, page: number = 1) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_URL}/users/${username}/repos`,
      {
        params: {
          per_page: 20,
          page,
          sort: "updated",
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Пользователь не найден');
    } else if (!axiosError.response) {
      throw new Error('Проблема с сетью. Проверьте подключение к интернету.');
    }
    throw new Error('Ошибка при загрузке данных, возможно стоит отключить VPN');
  }
};