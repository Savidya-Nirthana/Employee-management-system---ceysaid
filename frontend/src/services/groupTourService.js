import API from "./axiosinstant";
const BASE_URL = "api/v1/groups";
export const getData = async (formData) => {
  try {
    const response = await API.post(`${BASE_URL}/saveData`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const uploadContent = async (userId, type, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("type", type);

  try {
    const response = await API.post(`${BASE_URL}/upload`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};


export const getGroupData = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getData`, {
      withCredentials: true,
    });
    return { status: true, data: response.data.data };
  } catch (e) {
    console.error(e);
  }
};


export const groupDelete = async (data) => {
  try {
    const response = await API.post(`${BASE_URL}/delete`, data, {
      withCredentials: true,
    });
    return { status: true, data: response.data.message };
  } catch (e) {
    console.error(e);
  }
};