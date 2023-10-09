import axios from "axios";
import { getCookie } from "./GetCookie";

export const fetchAvatars = async (username, setUserAvatars) => {
  const token = getCookie("token");
  try {
    const { data } = await axios.get(
      `http://localhost:6001/get-avatars/${username}`,
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
