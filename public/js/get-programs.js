// get programs from the server

import { Program } from "../classes/Program.js";
import { BASE_URL, TOKEN } from "../main.js";
import { addNewProgram } from "./add-new-program.js";
import { customAlert } from "./customAlert.js";

export const getPrograms = async () => {
  const { data } = await axios({
    method: "GET",
    url: `${BASE_URL}/programs`,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const displayPrograms = async () => {
  const programs = await getPrograms().catch((error) =>
    customAlert(error?.response?.data?.message || error.message, false)
  );

  const programsContainer = document.querySelector(".programs-container");

  programs.forEach((data) => {
    const program = new Program(data);
    programsContainer.appendChild(program.element);
  });
  const newProgramBtn = document.querySelector(".new-program .program-btn");

  newProgramBtn.addEventListener("click", addNewProgram);
};
