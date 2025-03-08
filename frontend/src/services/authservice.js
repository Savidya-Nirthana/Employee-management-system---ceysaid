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
    return error;
  }
};

export const login = async (userId, password) => {
  try {
    const response = await API.post(
      `${BASE_URL}/login`,
      { userId, password },
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

export const getTempUser = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getTempUser`, {
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
    const response = await API.post(
      `${BASE_URL}/regConfirm`,
      { formData: formData },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.error(err);
    return;
  }
};

export const uploadImage = async (email, type, file) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("type", type);
  formData.append("file", file);

  try {
    const response = await API.post(`${BASE_URL}/upload`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.path;
  } catch (e) {
    console.log(e);
  }
};

export const permenentReg = async (formData) => {
  try {
    const response = await API.post(`${BASE_URL}/permenentReg`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const getAppData = async () => {
  try {
    const response = await API.post(`${BASE_URL}/approvalData`, {
      withCredentials: true,
    });
    return { data: response.data.users, count: response.data.count };
  } catch (err) {
    console.error(err);
  }
};

export const rejectSend = (userId) => {
  console.log("reject");
};

export const getPermRegUser = async (userId) => {
  try {
    console.log(userId);
    const response = await API.post(
      `${BASE_URL}/getApprovalUser`,
      { userId: userId },
      {
        withCredentials: true,
      }
    );
    return response.data.user;
  } catch (err) {
    console.error(err);
  }
};

export const registerPermenently = async (user) => {
  try {
    const response = await API.post(
      `${BASE_URL}/registerPerm`,
      { user: user },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const getPermUsers = async () => {
  try {
    const response = await API.post(`${BASE_URL}/getPermUsers`, {
      withCredentials: true,
    });
    return response.data.users;
  } catch (err) {
    console.log(err);
  }
};

export const getProfileImage = async () => {
  try {
    const response = await API.get(`${BASE_URL}/profileImage`, {
      withCredentials: true,
      responseType: "blob",
    });
    const imageBlob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    console.log(imageUrl);
    return imageUrl;
  } catch (err) {
    console.log(err);
    return null
  }
};
