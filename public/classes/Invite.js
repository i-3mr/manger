import { customAlert } from "../js/customAlert.js";
import { BASE_URL, TOKEN } from "../main.js";
import { Program } from "./Program.js";

export class Invite {
  static counter = 0;
  constructor({ _id, programName, inviterName }) {
    this.id = _id;
    this.name = programName;
    this.owner = inviterName;

    this.element = this.createElement();
    Invite.counter++;
  }

  createElement() {
    const element = document.createElement("div");
    element.className = "program invite";
    element.style.animationDelay = `${Invite.counter * 0.01}s`;
    element.innerHTML = `
    <h4 class="program-title invite">${this.name}</h4>
    <p class="program-owner">${this.owner}</p>
    <div class="program-btns">
      <button class="program-btn accept-btn">قبول</button>
      <button class="program-btn reject-btn">رفض</button>
    </div>
    `;

    const acceptBtn = element.querySelector(".accept-btn");
    const rejectBtn = element.querySelector(".reject-btn");

    acceptBtn.addEventListener("click", () => {
      try {
        this.acceptInvite();
      } catch (err) {
        customAlert(err?.response?.data?.message || err.message, false);
      }
    });
    rejectBtn.addEventListener("click", () => {
      try {
        this.rejectInvite();
      } catch (err) {
        customAlert(err?.response?.data?.message || err.message, false);
      }
    });

    return element;
  }

  async acceptInvite() {
    const oldBtnText = this.element.querySelector(".accept-btn").textContent;
    this.element.classList.add("disabled");
    this.element.querySelector(".accept-btn").textContent = "جاري القبول...";
    try {
      await axios.patch(
        `${BASE_URL}/invitations/${this.id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      customAlert("تم قبول الدعوة بنجاح", true);
      this.element.remove();

      const program = new Program({
        name: this.name,
        ownerName: this.owner,
        _id: this.id,
      });
      document.querySelector(".programs-container").prepend(program.element);
    } catch (error) {
      customAlert(error?.response?.data?.message || error.message, false);
      this.element.querySelector(".accept-btn").classList.remove("disabled");
      this.element.querySelector(".accept-btn").textContent = oldBtnText;
    }
  }

  async rejectInvite() {
    const oldBtnText = this.element.querySelector(".reject-btn").textContent;
    this.element.classList.add("disabled");
    this.element.querySelector(".reject-btn").textContent = "جاري الرفض...";
    try {
      await axios({
        method: "delete",
        url: `${BASE_URL}/invitations/${this.id}/`,

        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      customAlert("تم رفض الدعوة بنجاح", true);
      this.element.remove();
    } catch (error) {
      customAlert(error?.response?.data?.message || error.message, false);
      this.element.querySelector(".reject-btn").classList.remove("disabled");
      this.element.querySelector(".reject-btn").textContent = oldBtnText;
    }
  }

  static fromJSON(json) {
    return new Invite(json);
  }
}
