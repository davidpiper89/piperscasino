import axios from "axios";
import { getCookie } from "./GetCookie";
import {apiURL} from "../config/apiUrl"

export const fetchAvatars = async (username, setUserAvatars) => {
  const token = getCookie("token");
  try {
    const { data } = await axios.get(
      `${apiURL}/get-avatars/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (data.success) {
      setUserAvatars(data.avatars);
    } else {
      console.error("Failed to fetch avatars:", data.error);
    }
  } catch (error) {
    console.error("Error fetching avatars:", error);
  }
};
