// email question

import { emailInput } from "../../js/emailInput.js";

export class EmailQuestion {
  constructor({ question }) {
    this.id = question._id;
    this.question = question;
    this.answer = null;

    this.element = this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "field-question question-container";

    const title = document.createElement("h2");
    title.textContent = this.question.title;

    const input = emailInput();

    input.addEventListener("input", () => {
      this.answer = input.value;
    });

    container.appendChild(title);
    container.appendChild(input);
    return container;
  }
}
