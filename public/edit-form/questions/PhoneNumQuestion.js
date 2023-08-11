import { FieldQuestion } from "./FieldQuestion.js";

export class PhoneNumQuestion extends FieldQuestion {
  static icon = `<i class="fa-solid fa-phone"></i>`;
  static id = "phone";
  static name = "رقم الهاتف"
  constructor({ count, question }) {
    super({ count, question });
  }

  render() {
    const container = super.render();

    const title = container.querySelector("h2");
    title.innerHTML = `${PhoneNumQuestion.icon} ${title.textContent}`;

    const p = document.createElement("p");
    p.textContent = "* هذا حقل مبني بشكل خاص لإدخال رقم الهاتف";
    p.className = "note";

    container.querySelector("textarea").after(p);

    return container;
  }

  getJSON() {
    return {
      _id: this.id,
      title: this.title,
      type: "phone",
    };
  }
}
