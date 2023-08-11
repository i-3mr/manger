import { API } from "../api.js";
import { QuestionBuilder } from "./questions/QuestionBuilder.js";

export const formId = new URLSearchParams(location.search).get("id");
export const allQuestions = [];

if (!formId) location.assign("/");

const form = await API.send({
  method: "get",
  url: `public-forms/${formId}`,
});

document.querySelector(".sub-title").textContent = `نموذج ${form.title}`;

form.questions.forEach((question) => {
  const element = QuestionBuilder.buildQuestion(question).element;

  document.querySelector(".questions-container").appendChild(element);
});
