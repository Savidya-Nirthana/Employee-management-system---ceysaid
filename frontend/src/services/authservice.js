import API from "./axiosinstant";

const BASE_URL = "api/v1/users";

export const register = async (data) => {
  try {
    const response = await API.post(
      `${BASE_URL}/register`,
      { data },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await API.post(
      `${BASE_URL}/login`,
      { username, password },
      { withCredentials: true }
    );

    return { message: response.data.message, status: response.status };
  } catch (error) {
    return { message: error.response.data.message, status: error.status };
  }
};

export const getData = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getUser`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const logOut = async () => {
  try {
    const response = await API.get(`${BASE_URL}/logout`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const regConfirm = async (formData) => {
  try {

    const response = await API.post(`${BASE_URL}/regConfirm`, {formData: formData}, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.error(err);
    return;
  }
};
