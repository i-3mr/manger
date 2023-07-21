export class Program {
  static counter = 0;
  constructor({ _id, name, ownerName }) {
    this.id = _id;
    this.name = name;
    this.owner = ownerName;

    this.element = this.createElement();
    Program.counter++;
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("program");
    element.style.animationDelay = `${Program.counter * 0.01}s`;
    element.innerHTML = `
    <h4 class="program-title">${this.name}</h4>
    <p class="program-owner">${this.owner}</p>
    <button class="program-btn">
        <span>الذهاب للبرنامج</span>
        <span class="arrow">←</span>
    </button>
    `;

    element
      .querySelector(".program-btn")
      .addEventListener("click", () => this.goToProgram());

    return element;
  }

  goToProgram() {
    location.assign(`./program/?id=${this.id}&name=${this.name}`);
  }

  static fromJSON(json) {
    return new Program(json);
  }
}
