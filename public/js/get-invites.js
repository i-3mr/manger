// get Invites

import { Invite } from "../classes/Invite.js";
import { BASE_URL, TOKEN } from "../main.js";

export const getInvites = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/invitations`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const displayInvites = async () => {
  const invites = await getInvites();

  if (!invites.length) return;

  const title = document.createElement("h2");
  title.className = "sub-title";
  title.textContent = "الدعوات";

  const description = document.createElement("p");
  description.className = "sub-description";
  description.textContent = "قائمة بالدعوات المرسلة لك للمشاركة في برامج أخرى";

  const invitesContainer = document.createElement("div");
  invitesContainer.className = "invites-container programs-container";

  invites.forEach((invite) => {
    invitesContainer.appendChild(new Invite(invite).element);
  });

  document.querySelector("main").append(title, description, invitesContainer);
};
