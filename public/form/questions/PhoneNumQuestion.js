import { customAlert } from "../../js/customAlert.js";
import { phoneInput } from "../../js/phoneInput.js";

export class PhoneNumQuestion {
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
    `;

    const input = phoneInput();

    input.addEventListener("onchange", (e) => {
      this.#changeAnswer(e.detail.value);
    });

    container.appendChild(input);
    return container;
  }

  validate() {
    // the phone number must be 10 digits && starts with 05
    const regex = /^05\d{8}$/;

    return regex.test(this.answer);
  }

  arabicToEnglish(num) {
    const regex = /[\u0660-\u0669]/g;
    return num.replace(regex, function (c) {
      return c.charCodeAt(0) - 1632;
    });
  }

  #changeAnswer(answer) {
    this.answer = this.arabicToEnglish(answer);
    if (this.validate())
      return this.element
        .querySelector(".question-input")
        .classList.remove("error");

    this.element.querySelector(".question-input").classList.add("error");
    customAlert("الرجاء إدخال رقم هاتف سعودي صحيح");
  }
}
