import API from "./axiosinstant";

const BASE_URL = "api/v1/profit";

export const getAddProfit = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getAddProfit`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};
