// add new program function

import { BASE_URL, TOKEN } from "../main.js";
import { Program } from "../classes/Program.js";
import { customAlert } from "./customAlert.js";
import { getPrograms } from "./get-programs.js";

export const addNewProgram = async () => {
  const container = document.createElement("div");
  container.className = "new-program-container-pop-up";
  container.innerHTML = `
    <div class="new-program-pop-up">
      <div class="program-header">
        <h2>إنشاء برنامج جديد</h2>
      </div>
      <form class="program-form">
        <div class="form-group">
          <label for="program-name">اسم البرنامج</label>
          <input
            type="text"
            id="program-name"
            name="name"
            class="form-control primary-input"
            autocomplete="off"
            placeholder="اسم البرنامج"
          />
        </div>
        <button type="submit" class="btn btn-primary program-btn">إنشاء البرنامج</button>
      </form>
    </div>`;

  const programForm = container.querySelector(".program-form");

  const input = programForm.querySelector("input");

  const button = programForm.querySelector(".program-btn");

  programForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const oldBtnText = button.textContent;
    button.classList.add("disabled");
    button.textContent = "جاري الإنشاء...";

    try {
      const data = await sendNewProgram(programForm);
      customAlert(data.message, true);

      const program = new Program(data.program);
      document.querySelector(".programs-container").prepend(program.element);

      container.remove();
    } catch (error) {
      customAlert(error?.response?.data?.message || error.message, false);
      button.classList.remove("disabled");
      button.textContent = oldBtnText;
    }
  });

  container.addEventListener(
    "click",
    (e) => e.target == container && container.remove()
  );

  container.addEventListener("keydown", (e) => {
    if (e.key == "Escape") container.remove();
  });

  document.body.appendChild(container);
  input.focus();
};

const sendNewProgram = async (programForm) => {
  const name = programForm["name"].value?.trim();

  if (!name) {
    programForm["name"].classList.add("invalid");
    throw new Error("يرجى إدخال اسم البرنامج");
  }

  const { data } = await axios({
    method: "POST",
    url: `${BASE_URL}/programs`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      name,
    },
  });

  return data;
};

