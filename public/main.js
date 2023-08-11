import { displayInvites } from "./js/get-invites.js";
import { displayPrograms } from "./js/get-programs.js";

 const token = localStorage.getItem("token");

 if (!token) location.assign("/login");

 displayPrograms();
 displayInvites();
