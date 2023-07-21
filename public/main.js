import { displayInvites } from "./js/get-invites.js";
import { displayPrograms } from "./js/get-programs.js";

export const TOKEN = localStorage.getItem("token");
export const BASE_URL = "/api/v1";

if (!TOKEN) location.assign("/login");

// const axios = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${TOKEN}`,
//   },
// });

displayPrograms();
displayInvites();
