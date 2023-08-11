import { QuestionBuilder } from "./questions/QuestionBuilder.js";
import { createNewQuestionElement } from "./js/create-new.js";
import { saveFormElement } from "./js/save-form.js";
import { API } from "../api.js";
import { generateQRCode } from "./js/generate-qr.js";
import { formUrlElement } from "./js/form-url-element.js";

const token = localStorage.getItem("token");

export const formId = new URLSearchParams(location.search).get("id");
export const allQuestions = [];

if (!token) location.assign("/login");
if (!formId) location.assign("/");

const { form } = await API.send({
  method: "get",
  url: `forms/${formId}`,
});

document.querySelector(".sub-title").textContent = `نموذج ${form.title}`;

form.questions.forEach((question) => {
  const element = new QuestionBuilder().renderQuestion(question.type, question);

  document.querySelector(".questions-container").appendChild(element);
});

createNewQuestionElement();
saveFormElement();

const formUrl = `https://m.i3mr.com/form/?id=${formId}`;
generateQRCode(formUrl);
formUrlElement(formUrl);
