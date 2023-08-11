// create new form element

import { API } from "../../api.js";
import { customAlert } from "../../js/customAlert.js";
import { programId } from "../main.js";
import { QuestionForm } from "./QuestionForm.js";

export const createNewFormElement = () => {
  const container = document.createElement("div");
  container.className = "create-new-form";

  container.innerHTML = `
    <h3 class="create-new-form-title">إنشاء نموذج جديد</h3>
    <form>
      <input type="text" name="form-name" class="create-new-form-input primary-input" placeholder="أدخل عنوان النموذج" />
      <button class="create-new-form-btn primary-btn" type="submit">إنشاء</button>
    </form>
  `;

  const form = container.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formTitle = e.target["form-name"].value.trim();
    const btn = e.target.querySelector("button");

    if (!formTitle) {
      e.target["form-name"].classList.add("invalid");
      return customAlert("يجب إدخال عنوان النموذج");
    }

    try {
      btn.classList.add("disabled");
      btn.textContent = "جاري الإنشاء...";

      const data = await createNewForm(formTitle);

      const formElement = QuestionForm.fromJSON(data.form);
      formElement.renderToDOM();

      container.remove();
    } catch (err) {
      customAlert(err?.response?.data?.message || err.message);
      btn.classList.remove("disabled");
      btn.textContent = "إنشاء";
    }
  });
  return container;
};

const createNewForm = async (formTitle) => {
  const data = await API.send({
    method: "POST",
    url: `forms`,
    data: {
      title: formTitle,
      programId,
    },
  });

  return data;
};
