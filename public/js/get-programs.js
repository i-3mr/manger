// get programs from the server

import { API } from "../api.js";
import { Program } from "../classes/Program.js";

import { addNewProgram } from "./add-new-program.js";
import { customAlert } from "./customAlert.js";

export const getPrograms = async () => {
  const data = await API.send({
    method: "GET",
    url: `programs`,
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
