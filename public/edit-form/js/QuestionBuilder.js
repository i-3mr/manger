// Question Builder

import { allQuestions } from "../main.js";
import { FieldQuestion } from "./FieldQuestion.js";
import { MultipleChoice } from "./MultipleChoice.js";

export class QuestionBuilder {
  static counter = 1;
  static types = [
    {
      id: "multiple",
      name: "إختيار من متعدد",
      class: MultipleChoice,
    },
    {
      id: "field",
      name: "تعبئة حقل",
      class: FieldQuestion,
    },
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
      typeElement.textContent = type.name;
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
    const Class = QuestionBuilder.types.find((el) => el.id === id).class;
    const object = new Class({ count: this.count, question });
    allQuestions.push(object);
    return object.element;
  }
}
