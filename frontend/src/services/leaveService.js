import API from "./axiosinstant";

const BASE_URL = "api/v1/leave";

export const leaveApply = async (leaveData) => {
  // console.log(leaveData);
  try {
    const response = await API.post(
      `${BASE_URL}/apply`,
      { leaveData },
      { withCredentials: true }
    );
    return { message: response.data.message, status: response.status };
  } catch (e) {
    console.error(e);
  }
};
