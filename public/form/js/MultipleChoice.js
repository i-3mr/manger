export class MultipleChoice {
  constructor({ question, choices, _id }) {
    this.id = _id;
    this.question = question;
    this.choices = choices;
    this.answer = null;

    this.element = this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "multiple-question question";

    container.innerHTML = `
      <h3 class="question-title">${this.question.title}</h3>
      <div class="question-choices"></div>
    `;

    const choicesContainer = container.querySelector(".question-choices");

    this.choices.forEach((choice, i) => {
      const choiceContainer = document.createElement("div");
      choiceContainer.className = "choice";
      choiceContainer.tabIndex = i; //!!!!!!!

      choiceContainer.innerHTML = `
      <span class="circle"></span>
      <label>${choice.title}</label>
      `;

      choiceContainer.addEventListener("click", () => {
        this.#changeAnswer(choice.title);
        choicesContainer
          .querySelectorAll(".choice")
          .forEach((choice) => choice.classList.remove("selected"));
        choiceContainer.classList.add("selected");
      });

      choicesContainer.appendChild(choiceContainer);
    });

    return container;
  }

  #changeAnswer(answer) {
    this.answer = answer;
  }
}
