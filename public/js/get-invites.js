// get Invites

import { API } from "../api.js";
import { Invite } from "../classes/Invite.js";

export const getInvites = async () => {
  return await API.send({
    method: "get",
    url: "invitations",
  });
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
