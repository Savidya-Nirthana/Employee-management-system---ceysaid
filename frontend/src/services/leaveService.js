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
    return {
      error: false,
      message: response.data.message,
      status: response.status,
    };
  } catch (e) {
    return {
      error: true,
      message: e.response.data.message,
      status: e.response.status,
    };
  }
};

export const fetchLeaves = async () => {
  try {
    const response = await API.get(`${BASE_URL}/getLeaves`, {
      withCredentials: true,
    });
    return response.data.leaves;
  } catch (e) {
    console.error(e);
  }
};

export const leaveAccept = async (leaveId) => {
  try {
    console.log(leaveId);
    const response = await API.post(
      `${BASE_URL}/accept`,
      { leaveId },
      { withCredentials: true }
    );
    return {
      error: false,
      message: response.data.message,
      status: response.status,
    };
  } catch (e) {
    return {
      error: true,
      message: e.response.data.message,
      status: e.response.status,
    };
  }
};

export const leaveStat = async (userId) => {
  try {
    const response = await API.post(
      `${BASE_URL}/leaveStat`,
      { userId: userId },
      { withCredentials: true }
    );
    return response.data.leaveStats;
  } catch (e) {
    console.error(e);
  }
};

export const leaveData = async () => {
  try {
    const response = await API.post(
      `${BASE_URL}/allData`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    return e.data;
  }
};

export const leaveUserDetails = async (showLeaveDetails) => {
  try {
    console.log(showLeaveDetails);
    const response = await API.post(
      `${BASE_URL}/getUserData`,
      { showLeaveDetails },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const rejectLeave = async (selectedLeave, comment) => {
  try {
    const response = await API.post(
      `${BASE_URL}/rejectLeave`,
      { selectedLeave, comment },
      { withCredentials: true }
    );
    return { message: response.data.message, error: false };
  } catch (e) {
    console.log(e);
  }
};
