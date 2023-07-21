// question form

export class QuestionForm {
  constructor({ _id, title }) {
    this.id = _id;
    this.title = title;

    this.element = this.render();
  }

  render() {
    const container = document.createElement("div");
    container.className = "program question-form";

    container.innerHTML = `
      <h2 class="form-title">${this.title}</h2>
      <p class="program-owner">قم بإضافة أسئلة إلى النموذج!</p>
      <button class="program-btn">
        <span>إدارة النموذج</span>
        <span class="arrow">←</span>
      </button>
    `;

    const btn = container.querySelector("button");

    btn.addEventListener("click", () => this.goToForm());

    return container;
  }

  renderToDOM() {
    document.querySelector(".grid-container").append(this.element);
  }

  goToForm() {
    location.assign(`/edit-form?id=${this.id}`);
  }

  static fromJSON(data) {
    return new QuestionForm(data);
  }
}
