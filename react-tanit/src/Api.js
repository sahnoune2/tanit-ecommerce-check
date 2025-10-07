import axios from "axios";
import { resolvePath } from "react-router-dom";

export const getCurrent = async () => {
  try {
    const response = await axios.get(
      "https://tanit-ecommerce-check.onrender.com/getCurrent",
      {
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getJobs = async () => {
  try {
    const response = await axios.get(
      "https://tanit-ecommerce-check.onrender.com/getjobs"
    );
    console.log(response);
    if (response.status === 200) {
      return response.data.job;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
