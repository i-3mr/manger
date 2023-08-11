// Question Builder

import { allQuestions } from "../main.js";
import { EmailQuestion } from "./EmailQuestion.js";
import { FieldQuestion } from "./FieldQuestion.js";
import { MultipleChoice } from "./MultipleChoice.js";
import { PhoneNumQuestion } from "./PhoneNumQuestion.js";

export class QuestionBuilder {
  static counter = 1;
  static types = [
    MultipleChoice,
    FieldQuestion,
    PhoneNumQuestion,
    EmailQuestion,
  ];
  constructor() {
    this.element = this.render();
    this.count = QuestionBuilder.counter++;
  }

  render() {
    const container = document.createElement("div");
    container.className = "question-container scaling";

    container.innerHTML = `
      <h2 class="question-title">اختر نوع السؤال</h2>
      <div class="types-container"></div>
    `;

    const typesContainer = container.querySelector(".types-container");

    QuestionBuilder.types.forEach((type) => {
      const typeElement = document.createElement("button");
      typeElement.className = "btn secondary-btn type-btn";

      typeElement.innerHTML = `${type.icon}${type.name}`;
      typeElement.addEventListener("click", () => {
        const element = this.renderQuestion(type.id);
        container.before(element);
        container.remove();
      });
      typesContainer.appendChild(typeElement);
    });

    return container;
  }

  renderQuestion(id, question = {}) {
    console.log(id);
    const Class = QuestionBuilder.types.find((el) => el.id === id);
    const object = new Class({ count: this.count, question });
    allQuestions.push(object);
    return object.element;
  }
}
