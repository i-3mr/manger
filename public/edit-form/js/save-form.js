// save form

import { customAlert } from "../../js/customAlert.js";
import { BASE_URL, TOKEN, allQuestions, formId } from "../main.js";

export const saveForm = async () => {
  const changedQuestions = allQuestions.filter((question) =>
    question.hasChanged()
  );

  const json = changedQuestions.map((question) => question.getJSON());

  if (json.length === 0) return customAlert("لا يوجد تغييرات");
  try {
    const { data } = await axios({
      method: "patch",
      url: `${BASE_URL}/forms/${formId}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        questions: json,
      },
    });

    // put ids in questions that don't have one (new questions)
    const ids = data.ids;

    changedQuestions.forEach((question, i) => {
      if (question.id) return;
      question.id = ids[i];
    });

    customAlert(data.message, true);
  } catch (err) {
    customAlert(err?.response?.data?.message || err.message, false);
  }
};

export const saveFormElement = () => {
  const container = document.createElement("div");
  container.className = "question-container new-question scaling";

  container.innerHTML = `
    <h2 class="question-title">حفظ النموذج</h2>
    <button class="btn primary-btn btn-sm green" id="save-form">حفظ</button>
  `;

  const btn = container.querySelector("button");
  btn.addEventListener("click", saveForm);

  document.querySelector(".questions-container").append(container);
};
