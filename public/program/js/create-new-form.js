// create new form element

import { customAlert } from "../../js/customAlert.js";
import { BASE_URL, TOKEN, programId } from "../main.js";

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
      console.log(data);
      // location.assign(`/form?id=${data.formId}`);
    } catch (err) {
      customAlert(err?.response?.data?.message || err.message);
      btn.classList.remove("disabled");
      btn.textContent = "إنشاء";
    }
  });
  return container;
};

const createNewForm = async (formTitle) => {
  const { data } = await axios({
    method: "POST",
    url: `${BASE_URL}/forms`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      title: formTitle,
      programId,
    },
  });

  return data;
};
