import { Question } from "./Question.js";

export class FieldQuestion extends Question {
  static icon = `<i class="fa-solid fa-pencil"></i>`;
  static id = "field";
  static name = "حقل نصي"
  constructor({ count, question }) {
    super({ count, question });

    this.oldState = {
      question: question?.title,
    };

    this.element = this.render();
  }

  render() {
    const container = this.mainContainer();

    const title = container.querySelector("h2");
    title.innerHTML = `${FieldQuestion.icon} ${title.innerHTML}`;

    return container;
  }

  hasChanged() {
    const result = this.oldState.question !== this?.title;
    this.oldState = {
      question: this.title,
    };
    return result;
  }

  getJSON() {
    return {
      _id: this.id,
      title: this.title,
      type: "field",
    };
  }
}
