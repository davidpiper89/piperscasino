import axios from "axios";
import { getCookie } from "./GetCookie";

export const updateUserAvatar = async (avatarName, username) => {
  const token = getCookie("token");

  try {
    const { data } = await axios.post(
      "http://localhost:6001/update-avatars",
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
