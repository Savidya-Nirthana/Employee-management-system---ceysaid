import API from "./axiosinstant";
const BASE_URL = "api/v1/sales";

export const getSalesById = async (userId) => {
  try {
    const data = await API.get(
      `${BASE_URL}/getSalesById`,
      { params: { userId } },
      { withCredentials: true }
    );

    return data.data.data;
  } catch (err) {
    console.error(err);
  }
};

export const addSales = async (salesDetails) => {
  try {
    const data = await API.post(`${BASE_URL}/addsales`, salesDetails, {
      withCredentials: true,
    });
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
