import axios from 'axios';

const backHostURL = 'http://localhost:3001';

const getUser = async () => {
  try {
    const response = await axios.get(backHostURL + '/getUsers');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserImages = async () => {
  try {
    const response = await axios.get(backHostURL + '/getUserImages');
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserImageByID = async (userID) => {
  try {
    const response = await axios.get(backHostURL + '/getUserImages/' + userID);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserByIDUser = async (userID) => {
  try {
    const response = await axios.get(
      backHostURL + '/getUserByIDUser/' + userID
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (formData) => {
  try {
    const response = await axios.post(backHostURL + '/createUser', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userID, formData) => {
  try {
    const response = await axios.put(
      backHostURL + '/updateUser/' + userID,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (userID) => {
  try {
    const response = await axios.put(backHostURL + '/deleteUser/' + userID);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  getUser,
  getUserImages,
  getUserImageByID,
  getUserByIDUser,
  createUser,
  updateUser,
  deleteUser,
};
