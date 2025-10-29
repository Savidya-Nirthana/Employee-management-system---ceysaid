import API from "./axiosinstant";
const BASE_URL = "api/v1/sales";

export const getSalesById = async (userId) => {
  try {
    const data = await API.get(
      `${BASE_URL}/getSalesById`,
      { params: { userId } },
      { withCredentials: true }
    );
    // console.log(data);
    if (data.data.isError) {
      console.log(data.data);
    } else {
      if (data.data.isEmpty) return { isError: false, isEmpty: true };
      else {
        return { isError: false, isEmpty: false, data: data.data.data };
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const addSales = async (salesDetails) => {
  try {
    const data = await API.post(`${BASE_URL}/addsales`, salesDetails, {
      withCredentials: true,
    });
    console.log(salesDetails);
    return { err: false, message: data.data.message };
  } catch (e) {
    return { err: true, message: e };
  }
};

export const getAllData = async () => {
  try {
    const data = await API.get(`${BASE_URL}/getAllData`, {
      withCredentials: true,
    });
    return data.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const operationDetails = async (formData) => {
  try {
    const data = await API.post(`${BASE_URL}/opData`, formData, {
      withCredentials: true,
    });
    return data.data;
  } catch (e) {
    return e;
  }
};

export const opertationUpload = async (subject, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("subject", subject);

  try {
    const response = await API.post(`${BASE_URL}/OpFiles`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.path;
  } catch (error) {
    console.log(error);
  }
};

export const saveFiles = async (urls, selectSale) => {
  try {
    const data = await API.post(
      `${BASE_URL}/saveFiles`,
      { urls: urls, selectSale: selectSale },
      { withCredentials: true }
    );

    return data.data;
  } catch (error) {
    return error;
  }
};

export const salesApprovalData = async (userId) => {
  try {
    const data = await API.get(`${BASE_URL}/getApprove`, {
      params: { userId: userId },
    });
    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export const proceed = async (data, userId) => {
  try {
    const response = await API.get(`${BASE_URL}/locked`, {
      params: { data: data, userId: userId },
    });
    // return response;
  } catch (e) {
    console.log(e);
  }
};

export const proceedClose = async (data, userId) => {
  try {
    const response = await API.get(`${BASE_URL}/unlocked`, {
      params: { data: data, userId: userId },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getApprovedData = async (userId) => {
  try {
    const response = await API.get(`${BASE_URL}/getApproved`, {
      params: { userId: userId },
    });
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const sendCofimation = async (saleId, files) => {
  try {
    const response = await API.post(
      `/api/v1/sales/sendConfirmation`,
      {
        saleId,
        files: files,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    console.error("Error sending confirmation:", e);
    throw e;
  }
};

export const confirmationUpload = async (subject, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("subject", subject);
  try {
    const response = await API.post(`${BASE_URL}/conFiles`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.path;
  } catch (e) {
    console.log(e);
  }
};

export const getOperationPersons = async () => {
  try {
    const data = await API.get(`${BASE_URL}/getOperationPersons`, {
      withCredentials: true,
    });
    return data.data;
    // return data.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const uploadFilesFin = async (files, name, subject) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("name", name);
  formData.append("subject", subject);
  try {
    const response = await API.post(`${BASE_URL}/uploadFilesFin`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
