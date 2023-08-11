import { customAlert } from "../../js/customAlert.js";
import { Question } from "./Question.js";

export class MultipleChoice extends Question {
  static icon = `<i class="fa-solid fa-list"></i>`;
  static id = "multiple";
  static name = "اختيارات متعددة";
  constructor({ count, question }) {
    super({ count, question });

    this.choices = question?.choices || [];

    this.oldState = {
      question: this.title,
      choices: [...this.choices],
    };

    this.element = this.render();

    for (const i in question?.choices || []) {
      this.addChoice(+i, question?.choices[i]);
    }
  }

  render() {
    const mainContainer = this.mainContainer();
    const container = document.createElement("div");

    const title = mainContainer.querySelector("h2");
    title.innerHTML = `${MultipleChoice.icon} ${title.innerHTML}`;

    container.innerHTML += `
    <div class="question-choices"></div>
    <button class="btn secondary-btn add-choice-btn">+ إضافة خيار</button>
    `;

    this.choicesContainer = container.querySelector(".question-choices");

    const addNewChoiceBtn = container.querySelector(".add-choice-btn");

    addNewChoiceBtn.addEventListener("click", () =>
      this.addChoice(this.choices.length)
    );

    container.append(this.choicesContainer, addNewChoiceBtn);

    while (this.choices.length < 2) this.addChoice(this.choices.length);

    mainContainer.append(...container.children);
    return mainContainer;
  }

  addChoice(id, title) {
    const choice = title || `الخيار ${id + 1}`;

    const choiceContainer = document.createElement("div");
    choiceContainer.className = "choice";
    choiceContainer.tabIndex = id; //!!!!!!!

    choiceContainer.innerHTML = `
    <span class="del"> <span class="delete-icon">x</span> </span>
    <textarea type="text" class="question-input primary-input no-resize" placeholder="${choice}">${choice}</textarea>    `;

    const textArea = choiceContainer.querySelector("textarea");

    const del = choiceContainer.querySelector(".del");

    del.addEventListener("click", () => {
      if (this.choices.length === 2)
        return customAlert("يجب أن يحتوي السؤال على خيارين على الأقل");
      this.choices.splice(id, 1);
      choiceContainer.remove();
    });

    textArea.addEventListener("keyup", (e) => {
      this.choices[id] = e.target.value;
    });

    this.choicesContainer.appendChild(choiceContainer);
    if (!title) this.choices.push(choice);
  }

  hasChanged() {
    const result =
      this.title.trim() !== this.oldState.question.trim() ||
      this.choices.some((choice, i) => choice !== this.oldState.choices[i]);

    this.oldState = {
      question: this.title,
      choices: [...this.choices],
    };

    return result;
  }

  getJSON() {
    return {
      _id: this.id,
      title: this.title,
      choices: this.choices,
      type: "multiple",
    };
  }
}
