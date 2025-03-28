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
