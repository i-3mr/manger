// email question

import { FieldQuestion } from "./FieldQuestion.js";

export class EmailQuestion extends FieldQuestion {
  static icon = `<i class="fa-solid fa-at"></i>`;
  static id = "email";
  static name = "البريد الإلكتروني"
  constructor({ count, question }) {
    super({ count, question });
  }

  render() {
    const container = super.render();

    const title = container.querySelector("h2");
    title.innerHTML = `${EmailQuestion.icon} ${title.textContent}`;

    const p = document.createElement("p");
    p.textContent = "* هذا حقل مبني بشكل خاص لإدخال البريد الإلكتروني";
    p.className = "note";

    container.querySelector("textarea").after(p);

    return container;
  }

  getJSON() {
    return {
      _id: this.id,
      title: this.title,
      type: "email",
    };
  }
}
