import axios from "axios";
import { getCookie } from "./GetCookie";
import { apiURL } from "../config/apiUrl";

export const updateUserAvatar = async (avatarName, username) => {
  const token = getCookie("token");

  try {
    const { data } = await axios.post(
      `${apiURL}/update-avatars`,
      { avatarName, username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log("Error while updating avatar:", error);
    return { success: false };
  }
};
