import API from "./axiosinstant";

const BASE_URL = "api/v1/users";

export const login = async (username, password) => {
  const response = await API.post(
    `${BASE_URL}/login`,
    { username, password },
    { withCredentials: true }
  );
  console.log(response.data)
  return response;
};
