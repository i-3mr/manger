import { customConfirm } from "../../js/custom-confirm.js";
import { customAlert } from "../../js/customAlert.js";
import { BASE_URL, TOKEN, formId } from "../main.js";

// abstract class
export class Question {
  constructor({ count, question }) {
    this.id = question?._id || null;
    this.title = question?.title || "";
    this.count = count;
  }

  mainContainer() {
    const container = document.createElement("div");
    container.className = "question-container scaling";

    container.innerHTML = `
    <div class="row-between">
      <h2 class="question-title">السؤال ${this.count}</h2>
      <button id="delete" class="btn secondary-btn delete-question-btn red">x حذف السؤال</button>
    </div>
      <textarea type="text" class="question-input primary-input" placeholder="${
        this.title || "عنوان السؤال"
      }" />${this.title}</textarea>
    `;

    const textArea = container.querySelector("textarea");
    textArea.addEventListener("keyup", (e) => {
      this.title = e.target.value;
    });

    const deleteBtn = container.querySelector("#delete");
    deleteBtn.addEventListener("click", () => {
      customConfirm({
        message: "هل أنت متأكد من حذف السؤال؟",
        callback: () => this.delete(),
        description: "لن تتمكن من استرجاع السؤال بعد الحذف",
      });
    });

    return container;
  }

  hasChanged() {}

  getJSON() {}

  async delete() {
    if (!this.id) {
      customAlert("تم حذف السؤال بنجاح", true);
      return this.element.remove();
    }

    try {
      const { data } = await axios({
        method: "DELETE",
        url: `${BASE_URL}/forms/${formId}/questions/${this.id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      customAlert(data.message, true);
      this.element.remove();
    } catch (error) {
      customAlert(error?.response?.data?.message || error.message, false);
    }
  }
}
