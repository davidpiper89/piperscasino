import axios from "axios";
import { getCookie } from "./GetCookie";
import {apiURL} from "../config/apiUrl"

export async function updateBackend(newChips, username) {
  const token = getCookie("token");

  try {
    const { data } = await axios.put(
      `${apiURL}/update-chips`,
      { newChipCount: newChips, username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    if (data.status === 1) {
      return { success: true, newChips };
    } else {
      console.log("Failed to update backend");
      return { success: false };
    }
  } catch (error) {
    console.log("Error while updating backend:", error);
    return { success: false, error };
  }
}
