// invite members

import { customAlert } from "../../js/customAlert.js";
import { isEmail } from "../../js/is-email.js";
import { BASE_URL, TOKEN, programId } from "../main.js";

export const inviteMembersELement = () => {
  const container = document.createElement("section");
  container.className = "invite-members contributors";

  container.innerHTML = `
    <h2 class="contributors-title">دعوة مساهمين</h2>
    <form class="invite-members-form">
      <div class="form-group">
        <label for="email">البريد الإلكتروني</label>
        <input type="email" id="email" name="email" placeholder="البريد الإلكتروني" />
      </div>
      <button class="btn primary-btn">دعوة</button>
    </form>
  `;

  const form = container.querySelector(".invite-members-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const data = await inviteMember(form.email.value.trim());
      customAlert(data.message, true);
      form.reset();
    } catch (error) {
      customAlert(error?.response?.data?.message || error.message);
    }
  });

  document.body.querySelector(".members").appendChild(container);
};

const inviteMember = async (email) => {
  if (!isEmail(email)) throw new Error("البريد الإلكتروني غير صالح");

  const { data } = await axios({
    method: "post",
    url: `${BASE_URL}/invitations`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      inviteeEmail: email,
      programId,
    },
  });

  return data;
};
