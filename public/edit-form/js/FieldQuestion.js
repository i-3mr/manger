import { Question } from "./Question.js";

export class FieldQuestion extends Question {
  constructor({ count, question }) {
    super({ count, question });

    this.oldState = {
      question: question?.title,
    };

    this.element = this.render();
  }

  render() {
    const container = this.mainContainer();

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
