export class FieldQuestion {
  constructor({ question }) {
    this.id = question._id;
    this.question = question;
    this.answer = null;

    this.element = this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "field-question question-container";

    container.innerHTML = `
      <h3 class="question-title">${this.question.title}</h3>
      <input type="text" class="question-input primary-input" placeholder="أدخل الإجابة" />
    `;

    const input = container.querySelector(".question-input");

    input.addEventListener("onchange", () => this.#changeAnswer(input.value));

    return container;
  }

  #changeAnswer(answer) {
    this.answer = answer;
  }
}
