// create new question

import { QuestionBuilder } from "./QuestionBuilder.js";

export const createNewQuestionElement = () => {
  const container = document.createElement("div");
  container.className = "question-container new-question scaling";

  container.innerHTML = `
    <h2 class="question-title">إضافة سؤال جديد</h2>
    <button class="btn primary-btn btn-sm" id="add-question">إضافة سؤال</button>
  `;

  const btn = container.querySelector("button");
  btn.addEventListener("click", createNewQuestion);

  document.querySelector(".questions-container").append(container);
};

const createNewQuestion = () => {
  const builder = new QuestionBuilder();
  document.querySelector(".new-question").before(builder.element);
};
