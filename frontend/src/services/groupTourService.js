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


export const participantDocUpload = async (file, groupId, participantName) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("groupId", groupId);
    formData.append("participantName", participantName);

    const response = await API.post(`${BASE_URL}/uploadParticipantDoc`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {path: response.data.path, error: false};

  } catch (e) {
    console.log(e);
  } 
}

export const participantAdd = async (formData) => {
  try {
    const response = await API.post(`${BASE_URL}/addParticipant`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { error: false , data: response.data.message};
  } catch (e) {
    console.log(e);
  }
};


export const getParticipants = async (groupId) => {
  try {
    const response = await API.post(`${BASE_URL}/getParticipants/`, { groupId }, {  
      withCredentials: true,
    });
    return { status: true, data: response.data.data };
  } catch (e) {
    console.error(e);
  }
};