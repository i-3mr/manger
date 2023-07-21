import { QuestionBuilder } from "./js/QuestionBuilder.js";
import { createNewQuestionElement } from "./js/create-new.js";
import { saveFormElement } from "./js/save-form.js";

export const TOKEN = localStorage.getItem("token");
export const BASE_URL = "/api/v1";

export const formId = new URLSearchParams(location.search).get("id");
export const allQuestions = [];

if (!TOKEN) location.assign("/login");
if (!formId) location.assign("/");

const {
  data: { form },
} = await axios({
  method: "get",
  url: `${BASE_URL}/forms/${formId}`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

document.querySelector(".sub-title").textContent = `نموذج ${form.title}`;

form.questions.forEach((question) => {
  const element = new QuestionBuilder().renderQuestion(question.type, question);

  document.querySelector(".questions-container").appendChild(element);
});

createNewQuestionElement();
saveFormElement();
